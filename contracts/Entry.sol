// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Entry {
    using SafeMath for uint256;

    uint256 private entryFee;
    uint256 public prizePool;
    uint256 public totalEntryFees;

    event FeeEntry(address indexed participant, uint256 feeAmount);
    event PrizeIncreased(uint256 newPrizePool);
    event PrizePoolSet(uint256 prizePool);
    event PrizeDistributed(address indexed host, address[] participants, uint256[] amounts);

    struct Memo {
        string name;
        uint256 timestamp;
        address from;
    }

    Memo[] private memos;
    mapping(string => bool) private enrolled;
    address payable public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = payable(msg.sender);
    }

    function setEntryFee(uint256 newEntryFee) external onlyOwner {
        entryFee = newEntryFee;
    }

    function setPrizePool(uint256 newPrizePool) external onlyOwner {
        prizePool = newPrizePool;
        emit PrizePoolSet(prizePool);
    }

    function payEntryFee(string memory name) public payable {
        require(!enrolled[name], "Participant is already enrolled");
        require(msg.value != entryFee, "Incorrect ETH amount sent");

        owner.transfer(msg.value);
        memos.push(Memo(name, block.timestamp, msg.sender));
        emit FeeEntry(msg.sender, msg.value);

        totalEntryFees = totalEntryFees.add(msg.value);

        if (totalEntryFees > prizePool) {
            prizePool = totalEntryFees;
            emit PrizeIncreased(prizePool);
        }

        enrolled[name] = true;
    }

function distributePrize(address[] memory participants, uint256[] memory ratios) external onlyOwner {
    require(participants.length == 3, "Must provide exactly 3 participants");
    require(ratios.length == 4, "Must provide 4 ratios");  // top 3 participants in order and host

    uint256 totalPercentage = 0;
    for (uint256 i = 0; i < ratios.length; i++) {
        totalPercentage = totalPercentage.add(ratios[i]);
    }
    
    uint256 hostShare = prizePool.mul(ratios[0]).div(100);
    uint256 participantShare = prizePool.mul(ratios[1]).div(100);

    owner.transfer(hostShare);

    address[] memory winners = new address[](3);
    uint256[] memory amounts = new uint256[](3);

    winners[0] = participants[0];
    amounts[0] = participantShare.mul(ratios[2]).div(100);
    winners[1] = participants[1];
    amounts[1] = participantShare.mul(ratios[3]).div(100);
    winners[2] = participants[2];
    amounts[2] = participantShare.mul(100 - ratios[2] - ratios[3]).div(100);

    for (uint256 i = 0; i < 3; i++) {
        payable(winners[i]).transfer(amounts[i]);
    }

    emit PrizeDistributed(owner, winners, amounts);
}


    function getMemosLength() external view returns (uint256) {
        return memos.length;
    }

    function getMemoAtIndex(uint256 index) external view returns (string memory, uint256, address) {
        require(index < memos.length, "Index out of range");
        Memo memory memo = memos[index];
        return (memo.name, memo.timestamp, memo.from);
    }

    function getMemoDetailsByName(string memory searchName) external view returns (uint256, address) {
        require(enrolled[searchName], "Name not found");
    
        for (uint256 i = 0; i < memos.length; i++) {
            if (keccak256(bytes(memos[i].name)) == keccak256(bytes(searchName))) {
                return (memos[i].timestamp, memos[i].from);
            }
        }
    
        revert("Record not found for the provided search name");
    }

    function getEntryFee() external view returns (uint256) {
        return entryFee;
    }

    function getPrizePool() external view returns (uint256) {
        return prizePool;
    }

    function getTotalEntryFees() external view returns (uint256) {
        return totalEntryFees;
    }
}

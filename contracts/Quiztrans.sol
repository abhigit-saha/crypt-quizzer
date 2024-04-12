// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Entry {

    uint256 private entryFee;
    uint256 public prizePool; // Total prize pool set by the host
    uint256 public totalEntryFees; // Total entry fees collected

    event FeeEntry(address indexed participant, uint256 feeAmount);
    event PrizeIncreased(uint256 newPrizePool);
    event PrizePoolSet(uint256 prizePool);

    struct Memo {
        string name;
        uint256 timestamp;
        address from;
    }

    Memo[] private memos;
    address payable public owner;    // The admin's account

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
    // Check if the participant is already enrolled
    for (uint256 i = 0; i < memos.length; i++) {
        require(keccak256(bytes(memos[i].name)) != keccak256(bytes(name)), "Participant is already enrolled");
    }

    require(msg.value != entryFee, "Incorrect ETH amount sent");

    owner.transfer(msg.value);
    memos.push(Memo(name, block.timestamp, msg.sender));
    emit FeeEntry(msg.sender, msg.value);

    totalEntryFees += msg.value;

    if (totalEntryFees > prizePool) {
        prizePool = totalEntryFees;
        emit PrizeIncreased(prizePool);
    }
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
        for (uint256 i = 0; i < memos.length; i++) {
            if (keccak256(bytes(memos[i].name)) == keccak256(bytes(searchName))) {
                return (memos[i].timestamp, memos[i].from);
            }
        }
        revert("Name not found");
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

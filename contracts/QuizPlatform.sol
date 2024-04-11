// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract QuizPlatform {
    address public owner;
    uint256 public platformFeePercentage;

    event PlatformFeeChanged(uint256 newFee);

    constructor() {
        owner = msg.sender;
        platformFeePercentage = 5;  // 5%
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function setPlatformFee(uint256 _fee) external onlyOwner {
        require(_fee <= 10, "Fee can't exceed 10%");
        platformFeePercentage = _fee;
        emit PlatformFeeChanged(_fee);
    }

    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        uint256 feeAmount = (balance * platformFeePercentage) / 100;
        payable(owner).transfer(feeAmount);
    }
}

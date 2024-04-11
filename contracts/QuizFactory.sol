// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./Quiz.sol";

contract QuizFactory {
    event QuizCreated(address indexed quizContract, address indexed host, uint256 prizePool);

    function createQuiz(uint256 entryFee, uint256 initialPrizePool) external payable returns (address) {
        require(msg.value >= initialPrizePool, "Insufficient initial prize pool"); 
        //Remeber to update the prize pool
        
        Quiz newQuiz = new Quiz(msg.sender, entryFee, initialPrizePool);
        
        emit QuizCreated(address(newQuiz), msg.sender, initialPrizePool);

        return address(newQuiz);
    }
}

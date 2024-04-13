// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./Entry.sol";

contract QuizFactory {
    address[] public deployedEntries;
    mapping(address => address) public entryToHost;
    mapping(address => bool) public isHost;

    event EntryDeployed(address indexed host, address indexed entryContract);
    event QuizCreated(address indexed host, uint256 quizId, uint256 entryFee, uint256 prizePool);

    struct Quiz {
        uint256 quizId;
        uint256 entryFee;
        uint256 prizePool;
        address host;
        address entryContract;
    }

    mapping(address => Quiz) public quizzes;
    address[] public quizAddresses;

    function createQuiz(uint256 quizId, uint256 entryFee, uint256 prizePool) external {
        require(!isHost[msg.sender], "You are already a host");

        Quiz memory newQuiz = Quiz({
            quizId: quizId,
            entryFee: entryFee,
            prizePool: prizePool,
            host: msg.sender,
            entryContract: address(0) // Initialize with address(0), will be updated upon entry deployment
        });

        quizzes[msg.sender] = newQuiz;
        isHost[msg.sender] = true;
        quizAddresses.push(msg.sender);

        emit QuizCreated(msg.sender, quizId, entryFee, prizePool);
    }

    function deployEntry(address host) external payable {
        require(isHost[host], "Not a valid host");
        Quiz storage quiz = quizzes[host];

        Entry newEntry = new Entry();
        newEntry.setEntryFee(quiz.entryFee);
        newEntry.setPrizePool(quiz.prizePool);

        deployedEntries.push(address(newEntry));
        entryToHost[address(newEntry)] = host;
        quiz.entryContract = address(newEntry); // Update the entryContract address in the Quiz

        emit EntryDeployed(host, address(newEntry));
    }

    function getDeployedEntries() external view returns (address[] memory) {
        return deployedEntries;
    }

    function getQuizDetails(address host) external view returns (uint256, uint256, uint256, address, address) {
        Quiz memory quiz = quizzes[host];
        require(isHost[host], "Not a valid host");

        return (quiz.quizId, quiz.entryFee, quiz.prizePool, quiz.host, quiz.entryContract);
    }
}

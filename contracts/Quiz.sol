// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract Quiz {
    address public host;
    uint256 public entryFee;
    uint256 public prizePool;
    mapping(address => uint256) public scores;
    address[] public participants;

    event ParticipantEntered(address indexed participant, uint256 score);
    event PrizeDistributed(address indexed winner, uint256 amount);

    constructor(address _host, uint256 _entryFee, uint256 _prizePool) payable {
        host = _host;
        entryFee = _entryFee;
        prizePool = _prizePool;
    }

    function enterQuiz() external payable {
        require(msg.value == entryFee, "Incorrect entry fee");
        require(scores[msg.sender] == 0, "You've already entered the quiz");

        participants.push(msg.sender);
        emit ParticipantEntered(msg.sender, 0);
    }

    function submitScore(uint256 _score) external {
        require(scores[msg.sender] == 0, "Score already submitted");
        
        scores[msg.sender] = _score;
        emit ParticipantEntered(msg.sender, _score);
    }

    function distributePrizes() external {
        require(msg.sender == host, "Only the host can distribute prizes");
        
        uint256 totalParticipants = participants.length;
        require(totalParticipants > 0, "No participants");

        address[3] memory winners;
        uint256[3] memory winningAmounts;

        // Find top 3 scores
        for (uint256 i = 0; i < 3; i++) {
            uint256 highestScore = 0;
            address winnerAddress;

            for (uint256 j = 0; j < participants.length; j++) {
                if (scores[participants[j]] > highestScore) {
                    highestScore = scores[participants[j]];
                    winnerAddress = participants[j];
                }
            }

            winners[i] = winnerAddress;
            winningAmounts[i] = prizePool * (i == 0 ? 50 : (i == 1 ? 30 : 20)) / 100;

            // Remove winner from participants
            for (uint256 j = 0; j < participants.length; j++) {
                if (participants[j] == winnerAddress) {
                    participants[j] = participants[participants.length - 1];
                    participants.pop();
                    break;
                }
            }
        }

        // Distribute prizes
        uint256 platformFee = prizePool * 5 / 100;
        payable(address(this)).transfer(platformFee);
    }
}
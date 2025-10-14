// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "./Errors.sol";

contract Election {
    string public title;
    string public description;
    bool public isPublic;
    uint public startDate;
    uint public endDate;
    bool public isLive;

    address public owner;

    uint public candidatesCount;
    uint public votersCount;

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        string team;
        string image;
    }
    struct Voter {
        bool registered;
        bool voted;
        uint candidateId;
    }

    mapping(uint => Candidate) candidates;
    mapping(address => Voter) voters;

    event VoteCast(address indexed voter, uint indexed candidateId);
    event CandidateAdded(uint id, string name);
    event VotersAdded(address[] voters);
    event ElectionExtended(uint newEndDate);

    constructor(
        string memory _title,
        string memory _description,
        bool _isPublic,
        address _owner
    ) {
        title = _title;
        description = _description;
        isPublic = _isPublic;
        owner = _owner;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    modifier whileLive() {
        if (!isLive) revert ElectionIsNotLive();
        if (!(startDate < (block.timestamp * 1000)))
            revert ElectionNotStarted();
        if (!(endDate > (block.timestamp * 1000))) revert ElectionEnded();
        _;
    }

    modifier whileNotLive() {
        if (isLive) revert ElectionIsAlreadyLive();
        _;
    }

    function goLive() public onlyOwner whileNotLive {
        if ((endDate < startDate) || (startDate < (block.timestamp * 1000)))
            revert InvalidElectionDuration();
        isLive = true;
    }

    function addCandidate(
        string memory _name,
        string memory _team,
        string memory _image
    ) public onlyOwner whileNotLive {
        for (uint i = 1; i <= candidatesCount; i++) {
            if (
                keccak256(abi.encodePacked(candidates[i].name)) ==
                keccak256(abi.encodePacked(_name))
            ) revert CandidateAlreadyExists();
        }
        candidatesCount++;
        candidates[candidatesCount] = Candidate(
            candidatesCount,
            _name,
            0,
            _team,
            _image
        );
        emit CandidateAdded(candidatesCount, _name);
    }

    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidatesCount);
        for (uint i = 1; i <= candidatesCount; i++) {
            allCandidates[i - 1] = candidates[i];
        }
        return allCandidates;
    }

    function addVoters(
        address[] memory _voterAddresses
    ) public onlyOwner whileNotLive {
        uint length = _voterAddresses.length;
        for (uint i = 0; i < length; i++) {
            if (voters[_voterAddresses[i]].registered)
                revert VoterAlreadyRegistered();
            votersCount++;
            voters[_voterAddresses[i]] = Voter(true, false, 0);
        }
        emit VotersAdded(_voterAddresses);
    }

    function getVoter(address _voterAddress) public view returns (bool, uint) {
        Voter memory voter = voters[_voterAddress];
        return (voter.voted, voter.candidateId);
    }

    function castVote(uint _candidateId) public whileLive {
        if (voters[msg.sender].voted) revert AlreadyVoted();
        if (_candidateId == 0 || _candidateId > candidatesCount)
            revert InvalidCandidate();
        if (!isPublic && !voters[msg.sender].registered) revert Unauthorized();

        voters[msg.sender].voted = true;
        voters[msg.sender].candidateId = _candidateId;

        candidates[_candidateId].voteCount++;

        emit VoteCast(msg.sender, _candidateId);
    }

    function getElectionSummary()
        public
        view
        returns (Candidate[] memory, uint)
    {
        uint totalVotes = 0;
        Candidate[] memory allCandidates = new Candidate[](candidatesCount);

        for (uint i = 1; i <= candidatesCount; ) {
            allCandidates[i - 1] = candidates[i];
            unchecked {
                totalVotes += candidates[i].voteCount;
            }
            i++;
        }

        return (allCandidates, totalVotes);
    }

    function updateElectionDates(
        uint _startDate,
        uint _endDate
    ) public onlyOwner whileNotLive {
        startDate = _startDate;
        endDate = _endDate;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBountyMarketplace {
    enum BountyStatus {
        OPEN,
        ASSIGNED,
        SUBMITTED,
        COMPLETED,
        CANCELLED
    }

    enum Difficulty {
        BEGINNER,
        INTERMEDIATE,
        EXPERT
    }

    struct Bounty {
        uint256 id;
        address issuer;
        string title;
        string description;
        address rewardToken;
        uint256 rewardAmount;
        uint256 deadline;
        Difficulty difficulty;
        string[] tags;
        BountyStatus status;
        address assignee;
        uint256 createdAt;
        uint256 completedAt;
    }

    struct Application {
        address applicant;
        string message;
        uint256 appliedAt;
        bool active;
    }

    function createBounty(
        string memory _title,
        string memory _description,
        address _rewardToken,
        uint256 _rewardAmount,
        uint256 _deadline,
        Difficulty _difficulty,
        string[] memory _tags
    ) external payable returns (uint256 bountyId);

    function applyToBounty(uint256 _bountyId, string memory _message) external;

    function assignBounty(uint256 _bountyId, address _applicant) external;

    function submitWork(uint256 _bountyId, string memory _submissionUrl) external;

    function completeBounty(uint256 _bountyId) external;

    function cancelBounty(uint256 _bountyId) external;

    function getBounty(uint256 _bountyId) external view returns (Bounty memory);

    function getApplications(uint256 _bountyId) external view returns (Application[] memory);
}


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title BountyMarketplace
 * @dev Decentralized micro-bounty marketplace for atomic tasks on Base
 */
contract BountyMarketplace is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    // ============ Constants ============
    uint256 public constant PLATFORM_FEE_BPS = 250; // 2.5% platform fee
    address public constant ETH_PLACEHOLDER = address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);

    // ============ Enums ============
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

    // ============ Structs ============
    struct Bounty {
        uint256 id;
        address issuer;
        string title;
        string description;
        address rewardToken; // address(0) for ETH
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

    // ============ State Variables ============
    uint256 public nextBountyId;
    mapping(uint256 => Bounty) public bounties;
    mapping(uint256 => Application[]) public applications;
    mapping(uint256 => mapping(address => bool)) public hasApplied;
    
    // Token whitelist for rewards (empty = all tokens allowed)
    mapping(address => bool) public allowedTokens;
    bool public tokenWhitelistEnabled;

    // ============ Events ============
    event BountyCreated(
        uint256 indexed bountyId,
        address indexed issuer,
        address rewardToken,
        uint256 rewardAmount,
        uint256 deadline
    );

    event ApplicationSubmitted(
        uint256 indexed bountyId,
        address indexed applicant,
        string message
    );

    event BountyAssigned(
        uint256 indexed bountyId,
        address indexed issuer,
        address indexed assignee
    );

    event SubmissionSubmitted(
        uint256 indexed bountyId,
        address indexed assignee,
        string submissionUrl
    );

    event BountyCompleted(
        uint256 indexed bountyId,
        address indexed issuer,
        address indexed assignee,
        address rewardToken,
        uint256 rewardAmount,
        uint256 platformFee
    );

    event BountyCancelled(
        uint256 indexed bountyId,
        address indexed issuer,
        address rewardToken,
        uint256 refundAmount
    );

    event FundsWithdrawn(
        address indexed to,
        address token,
        uint256 amount
    );

    // ============ Constructor ============
    constructor(address _owner) Ownable(_owner) {
        // Set owner as deployer if not provided
        if (_owner == address(0)) {
            _transferOwnership(msg.sender);
        }
        
        // Initialize with common Base tokens
        allowedTokens[address(0)] = true; // ETH
        tokenWhitelistEnabled = false; // Allow all tokens by default
    }

    // ============ Modifiers ============
    modifier validBounty(uint256 _bountyId) {
        require(_bountyId < nextBountyId, "Bounty does not exist");
        _;
    }

    modifier onlyIssuer(uint256 _bountyId) {
        require(
            bounties[_bountyId].issuer == msg.sender,
            "Only issuer can perform this action"
        );
        _;
    }

    modifier onlyAssignee(uint256 _bountyId) {
        require(
            bounties[_bountyId].assignee == msg.sender,
            "Only assignee can perform this action"
        );
        _;
    }

    // ============ Main Functions ============

    /**
     * @dev Create a new bounty with escrowed funds
     * @param _title Title of the bounty
     * @param _description Detailed description (can be IPFS hash)
     * @param _rewardToken Address of reward token (address(0) for ETH)
     * @param _rewardAmount Amount of reward tokens
     * @param _deadline Unix timestamp deadline
     * @param _difficulty Difficulty level (0=Beginner, 1=Intermediate, 2=Expert)
     * @param _tags Array of tag strings
     */
    function createBounty(
        string memory _title,
        string memory _description,
        address _rewardToken,
        uint256 _rewardAmount,
        uint256 _deadline,
        Difficulty _difficulty,
        string[] memory _tags
    ) external payable nonReentrant returns (uint256 bountyId) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_rewardAmount > 0, "Reward amount must be greater than 0");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        
        // Check token whitelist if enabled
        if (tokenWhitelistEnabled) {
            require(allowedTokens[_rewardToken], "Token not allowed");
        }

        bountyId = nextBountyId++;
        
        // Handle payment
        if (_rewardToken == address(0)) {
            // ETH payment
            require(msg.value == _rewardAmount, "ETH amount mismatch");
        } else {
            // ERC20 payment
            IERC20(_rewardToken).safeTransferFrom(
                msg.sender,
                address(this),
                _rewardAmount
            );
        }

        // Create bounty struct
        bounties[bountyId] = Bounty({
            id: bountyId,
            issuer: msg.sender,
            title: _title,
            description: _description,
            rewardToken: _rewardToken,
            rewardAmount: _rewardAmount,
            deadline: _deadline,
            difficulty: _difficulty,
            tags: _tags,
            status: BountyStatus.OPEN,
            assignee: address(0),
            createdAt: block.timestamp,
            completedAt: 0
        });

        emit BountyCreated(
            bountyId,
            msg.sender,
            _rewardToken,
            _rewardAmount,
            _deadline
        );
    }

    /**
     * @dev Apply to a bounty
     * @param _bountyId ID of the bounty
     * @param _message Application message
     */
    function applyToBounty(
        uint256 _bountyId,
        string memory _message
    ) external validBounty(_bountyId) {
        Bounty storage bounty = bounties[_bountyId];
        
        require(bounty.status == BountyStatus.OPEN, "Bounty is not open");
        require(bounty.deadline > block.timestamp, "Bounty deadline has passed");
        require(!hasApplied[_bountyId][msg.sender], "Already applied to this bounty");
        require(bounty.issuer != msg.sender, "Cannot apply to your own bounty");

        hasApplied[_bountyId][msg.sender] = true;
        
        applications[_bountyId].push(Application({
            applicant: msg.sender,
            message: _message,
            appliedAt: block.timestamp,
            active: true
        }));

        emit ApplicationSubmitted(_bountyId, msg.sender, _message);
    }

    /**
     * @dev Assign a bounty to an applicant
     * @param _bountyId ID of the bounty
     * @param _applicant Address of the applicant to assign
     */
    function assignBounty(
        uint256 _bountyId,
        address _applicant
    ) external validBounty(_bountyId) onlyIssuer(_bountyId) {
        Bounty storage bounty = bounties[_bountyId];
        
        require(bounty.status == BountyStatus.OPEN, "Bounty is not open");
        require(hasApplied[_bountyId][_applicant], "Address has not applied");
        
        // Find and verify application is active
        bool found = false;
        for (uint256 i = 0; i < applications[_bountyId].length; i++) {
            if (
                applications[_bountyId][i].applicant == _applicant &&
                applications[_bountyId][i].active
            ) {
                found = true;
                break;
            }
        }
        require(found, "Application not found or inactive");

        bounty.status = BountyStatus.ASSIGNED;
        bounty.assignee = _applicant;

        emit BountyAssigned(_bountyId, msg.sender, _applicant);
    }

    /**
     * @dev Submit work completion (assignee calls this)
     * @param _bountyId ID of the bounty
     * @param _submissionUrl URL or IPFS hash of submission
     */
    function submitWork(
        uint256 _bountyId,
        string memory _submissionUrl
    ) external validBounty(_bountyId) onlyAssignee(_bountyId) {
        Bounty storage bounty = bounties[_bountyId];
        
        require(
            bounty.status == BountyStatus.ASSIGNED,
            "Bounty is not assigned"
        );
        require(bytes(_submissionUrl).length > 0, "Submission URL cannot be empty");

        bounty.status = BountyStatus.SUBMITTED;

        emit SubmissionSubmitted(_bountyId, msg.sender, _submissionUrl);
    }

    /**
     * @dev Complete a bounty and release payment (issuer approves submission)
     * @param _bountyId ID of the bounty
     */
    function completeBounty(
        uint256 _bountyId
    ) external validBounty(_bountyId) onlyIssuer(_bountyId) nonReentrant {
        Bounty storage bounty = bounties[_bountyId];
        
        require(
            bounty.status == BountyStatus.SUBMITTED,
            "Bounty must be in SUBMITTED status"
        );

        bounty.status = BountyStatus.COMPLETED;
        bounty.completedAt = block.timestamp;

        // Calculate fees
        uint256 platformFee = (bounty.rewardAmount * PLATFORM_FEE_BPS) / 10000;
        uint256 assigneeReward = bounty.rewardAmount - platformFee;

        // Transfer funds
        if (bounty.rewardToken == address(0)) {
            // ETH payment
            (bool success1, ) = payable(bounty.assignee).call{value: assigneeReward}("");
            require(success1, "ETH transfer to assignee failed");
            
            if (platformFee > 0) {
                (bool success2, ) = payable(owner()).call{value: platformFee}("");
                require(success2, "ETH transfer to platform failed");
            }
        } else {
            // ERC20 payment
            IERC20(bounty.rewardToken).safeTransfer(bounty.assignee, assigneeReward);
            
            if (platformFee > 0) {
                IERC20(bounty.rewardToken).safeTransfer(owner(), platformFee);
            }
        }

        emit BountyCompleted(
            _bountyId,
            msg.sender,
            bounty.assignee,
            bounty.rewardToken,
            assigneeReward,
            platformFee
        );
    }

    /**
     * @dev Cancel a bounty and refund (only issuer, only if not assigned)
     * @param _bountyId ID of the bounty
     */
    function cancelBounty(
        uint256 _bountyId
    ) external validBounty(_bountyId) onlyIssuer(_bountyId) nonReentrant {
        Bounty storage bounty = bounties[_bountyId];
        
        require(
            bounty.status == BountyStatus.OPEN,
            "Can only cancel open bounties"
        );

        bounty.status = BountyStatus.CANCELLED;

        // Refund to issuer
        if (bounty.rewardToken == address(0)) {
            (bool success, ) = payable(bounty.issuer).call{value: bounty.rewardAmount}("");
            require(success, "ETH refund failed");
        } else {
            IERC20(bounty.rewardToken).safeTransfer(bounty.issuer, bounty.rewardAmount);
        }

        emit BountyCancelled(
            _bountyId,
            msg.sender,
            bounty.rewardToken,
            bounty.rewardAmount
        );
    }

    // ============ View Functions ============

    /**
     * @dev Get bounty details
     */
    function getBounty(
        uint256 _bountyId
    ) external view validBounty(_bountyId) returns (Bounty memory) {
        return bounties[_bountyId];
    }

    /**
     * @dev Get all applications for a bounty
     */
    function getApplications(
        uint256 _bountyId
    ) external view validBounty(_bountyId) returns (Application[] memory) {
        return applications[_bountyId];
    }

    /**
     * @dev Get application count for a bounty
     */
    function getApplicationCount(
        uint256 _bountyId
    ) external view validBounty(_bountyId) returns (uint256) {
        return applications[_bountyId].length;
    }

    // ============ Admin Functions ============

    /**
     * @dev Toggle token whitelist requirement
     */
    function setTokenWhitelistEnabled(bool _enabled) external onlyOwner {
        tokenWhitelistEnabled = _enabled;
    }

    /**
     * @dev Add/remove token from whitelist
     */
    function setAllowedToken(address _token, bool _allowed) external onlyOwner {
        allowedTokens[_token] = _allowed;
    }

    /**
     * @dev Emergency withdrawal (owner only)
     */
    function emergencyWithdraw(
        address _token,
        uint256 _amount,
        address _to
    ) external onlyOwner {
        if (_token == address(0)) {
            (bool success, ) = payable(_to).call{value: _amount}("");
            require(success, "ETH transfer failed");
        } else {
            IERC20(_token).safeTransfer(_to, _amount);
        }
        
        emit FundsWithdrawn(_to, _token, _amount);
    }

    // ============ Receive Function ============
    receive() external payable {
        // Allow contract to receive ETH
    }
}


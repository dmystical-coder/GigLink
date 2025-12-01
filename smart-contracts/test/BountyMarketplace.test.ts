import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { BountyMarketplace } from "../typechain-types";

describe("BountyMarketplace", function () {
  let marketplace: BountyMarketplace;
  let owner: HardhatEthersSigner;
  let issuer: HardhatEthersSigner;
  let applicant: HardhatEthersSigner;
  let other: HardhatEthersSigner;

  const PLATFORM_FEE_BPS = 250; // 2.5%

  beforeEach(async function () {
    [owner, issuer, applicant, other] = await ethers.getSigners();

    const BountyMarketplace = await ethers.getContractFactory("BountyMarketplace");
    marketplace = await BountyMarketplace.deploy(owner.address);
    await marketplace.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await marketplace.owner()).to.equal(owner.address);
    });

    it("Should have correct platform fee", async function () {
      expect(await marketplace.PLATFORM_FEE_BPS()).to.equal(PLATFORM_FEE_BPS);
    });
  });

  describe("Bounty Creation", function () {
    const title = "Test Bounty";
    const description = "This is a test bounty description";
    const rewardAmount = ethers.parseEther("1.0");
    const deadline = Math.floor(Date.now() / 1000) + 86400; // 1 day from now
    const difficulty = 0; // BEGINNER
    const tags = ["test", "solidity"];

    it("Should create a bounty with ETH payment", async function () {
      await expect(
        marketplace.connect(issuer).createBounty(
          title,
          description,
          ethers.ZeroAddress, // ETH
          rewardAmount,
          deadline,
          difficulty,
          tags,
          { value: rewardAmount }
        )
      )
        .to.emit(marketplace, "BountyCreated")
        .withArgs(0, issuer.address, ethers.ZeroAddress, rewardAmount, deadline);

      const bounty = await marketplace.getBounty(0);
      expect(bounty.title).to.equal(title);
      expect(bounty.issuer).to.equal(issuer.address);
      expect(bounty.rewardAmount).to.equal(rewardAmount);
      expect(bounty.status).to.equal(0); // OPEN
    });

    it("Should reject bounty creation with wrong ETH amount", async function () {
      await expect(
        marketplace.connect(issuer).createBounty(
          title,
          description,
          ethers.ZeroAddress,
          rewardAmount,
          deadline,
          difficulty,
          tags,
          { value: ethers.parseEther("0.5") } // Wrong amount
        )
      ).to.be.revertedWith("ETH amount mismatch");
    });

    it("Should reject bounty creation with past deadline", async function () {
      const pastDeadline = Math.floor(Date.now() / 1000) - 86400;

      await expect(
        marketplace.connect(issuer).createBounty(
          title,
          description,
          ethers.ZeroAddress,
          rewardAmount,
          pastDeadline,
          difficulty,
          tags,
          { value: rewardAmount }
        )
      ).to.be.revertedWith("Deadline must be in the future");
    });
  });

  describe("Application System", function () {
    let bountyId: bigint;
    const rewardAmount = ethers.parseEther("1.0");

    beforeEach(async function () {
      const deadline = Math.floor(Date.now() / 1000) + 86400;
      await marketplace.connect(issuer).createBounty(
        "Test Bounty",
        "Description",
        ethers.ZeroAddress,
        rewardAmount,
        deadline,
        0,
        ["test"],
        { value: rewardAmount }
      );
      bountyId = 0n;
    });

    it("Should allow applying to a bounty", async function () {
      await expect(
        marketplace.connect(applicant).applyToBounty(bountyId, "I want to work on this")
      )
        .to.emit(marketplace, "ApplicationSubmitted")
        .withArgs(bountyId, applicant.address, "I want to work on this");

      const applications = await marketplace.getApplications(bountyId);
      expect(applications.length).to.equal(1);
      expect(applications[0].applicant).to.equal(applicant.address);
    });

    it("Should prevent applying to own bounty", async function () {
      await expect(
        marketplace.connect(issuer).applyToBounty(bountyId, "My own application")
      ).to.be.revertedWith("Cannot apply to your own bounty");
    });

    it("Should prevent duplicate applications", async function () {
      await marketplace.connect(applicant).applyToBounty(bountyId, "First application");

      await expect(
        marketplace.connect(applicant).applyToBounty(bountyId, "Second application")
      ).to.be.revertedWith("Already applied to this bounty");
    });
  });

  describe("Bounty Assignment", function () {
    let bountyId: bigint;
    const rewardAmount = ethers.parseEther("1.0");

    beforeEach(async function () {
      const deadline = Math.floor(Date.now() / 1000) + 86400;
      await marketplace.connect(issuer).createBounty(
        "Test Bounty",
        "Description",
        ethers.ZeroAddress,
        rewardAmount,
        deadline,
        0,
        ["test"],
        { value: rewardAmount }
      );
      bountyId = 0n;
      await marketplace.connect(applicant).applyToBounty(bountyId, "I want to work");
    });

    it("Should allow issuer to assign bounty", async function () {
      await expect(
        marketplace.connect(issuer).assignBounty(bountyId, applicant.address)
      )
        .to.emit(marketplace, "BountyAssigned")
        .withArgs(bountyId, issuer.address, applicant.address);

      const bounty = await marketplace.getBounty(bountyId);
      expect(bounty.status).to.equal(1); // ASSIGNED
      expect(bounty.assignee).to.equal(applicant.address);
    });

    it("Should prevent non-issuer from assigning", async function () {
      await expect(
        marketplace.connect(other).assignBounty(bountyId, applicant.address)
      ).to.be.revertedWith("Only issuer can perform this action");
    });
  });

  describe("Bounty Completion Flow", function () {
    let bountyId: bigint;
    const rewardAmount = ethers.parseEther("1.0");

    beforeEach(async function () {
      const deadline = Math.floor(Date.now() / 1000) + 86400;
      await marketplace.connect(issuer).createBounty(
        "Test Bounty",
        "Description",
        ethers.ZeroAddress,
        rewardAmount,
        deadline,
        0,
        ["test"],
        { value: rewardAmount }
      );
      bountyId = 0n;
      await marketplace.connect(applicant).applyToBounty(bountyId, "Application");
      await marketplace.connect(issuer).assignBounty(bountyId, applicant.address);
    });

    it("Should allow assignee to submit work", async function () {
      await expect(
        marketplace.connect(applicant).submitWork(bountyId, "ipfs://hash123")
      )
        .to.emit(marketplace, "SubmissionSubmitted")
        .withArgs(bountyId, applicant.address, "ipfs://hash123");

      const bounty = await marketplace.getBounty(bountyId);
      expect(bounty.status).to.equal(2); // SUBMITTED
    });

    it("Should complete bounty and distribute funds", async function () {
      await marketplace.connect(applicant).submitWork(bountyId, "ipfs://hash123");

      const initialBalance = await ethers.provider.getBalance(applicant.address);
      const platformFee = (rewardAmount * BigInt(PLATFORM_FEE_BPS)) / 10000n;
      const assigneeReward = rewardAmount - platformFee;

      const tx = await marketplace.connect(issuer).completeBounty(bountyId);
      const receipt = await tx.wait();
      const gasUsed = receipt!.gasUsed * receipt!.gasPrice;

      const finalBalance = await ethers.provider.getBalance(applicant.address);
      expect(finalBalance).to.equal(initialBalance + assigneeReward - gasUsed);

      const bounty = await marketplace.getBounty(bountyId);
      expect(bounty.status).to.equal(3); // COMPLETED
    });
  });

  describe("Bounty Cancellation", function () {
    let bountyId: bigint;
    const rewardAmount = ethers.parseEther("1.0");

    beforeEach(async function () {
      const deadline = Math.floor(Date.now() / 1000) + 86400;
      await marketplace.connect(issuer).createBounty(
        "Test Bounty",
        "Description",
        ethers.ZeroAddress,
        rewardAmount,
        deadline,
        0,
        ["test"],
        { value: rewardAmount }
      );
      bountyId = 0n;
    });

    it("Should allow issuer to cancel open bounty", async function () {
      const initialBalance = await ethers.provider.getBalance(issuer.address);

      const tx = await marketplace.connect(issuer).cancelBounty(bountyId);
      const receipt = await tx.wait();
      const gasUsed = receipt!.gasUsed * receipt!.gasPrice;

      const finalBalance = await ethers.provider.getBalance(issuer.address);
      expect(finalBalance).to.equal(initialBalance + rewardAmount - gasUsed);

      const bounty = await marketplace.getBounty(bountyId);
      expect(bounty.status).to.equal(4); // CANCELLED
    });

    it("Should prevent cancellation of assigned bounty", async function () {
      await marketplace.connect(applicant).applyToBounty(bountyId, "Application");
      await marketplace.connect(issuer).assignBounty(bountyId, applicant.address);

      await expect(
        marketplace.connect(issuer).cancelBounty(bountyId)
      ).to.be.revertedWith("Can only cancel open bounties");
    });
  });
});


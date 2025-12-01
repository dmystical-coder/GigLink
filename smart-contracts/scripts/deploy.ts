import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();

  console.log("Deploying BountyMarketplace with account:", deployerAddress);
  console.log("Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployerAddress)));

  // Deploy contract (owner will be deployer by default)
  const BountyMarketplace = await ethers.getContractFactory("BountyMarketplace");
  const marketplace = await BountyMarketplace.deploy(deployerAddress);

  await marketplace.waitForDeployment();
  const contractAddress = await marketplace.getAddress();

  console.log("\n=== Deployment Successful ===");
  console.log("Contract Address:", contractAddress);
  console.log("Owner:", deployerAddress);
  console.log("\nNext steps:");
  console.log(`1. Save contract address: ${contractAddress}`);
  console.log("2. Update your frontend config with this address");
  console.log("3. Verify contract on Basescan:");
  console.log(`   npx hardhat verify --network baseSepolia ${contractAddress} "${deployerAddress}"`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


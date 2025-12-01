import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const network = await ethers.provider.getNetwork();

  console.log("Deploying BountyMarketplace...");
  console.log("Network:", network.name, "(", network.chainId, ")");
  console.log("Deployer:", deployerAddress);
  console.log("Balance:", ethers.formatEther(await ethers.provider.getBalance(deployerAddress)), "ETH\n");

  // Deploy contract
  const BountyMarketplace = await ethers.getContractFactory("BountyMarketplace");
  const marketplace = await BountyMarketplace.deploy(deployerAddress);

  console.log("Waiting for deployment confirmation...");
  await marketplace.waitForDeployment();
  const contractAddress = await marketplace.getAddress();

  console.log("\n✅ Deployment Successful!");
  console.log("Contract Address:", contractAddress);
  console.log("Network:", network.name);
  console.log("Chain ID:", network.chainId.toString());

  // Save deployment info
  const deploymentInfo = {
    network: network.name,
    chainId: network.chainId.toString(),
    contractAddress,
    deployer: deployerAddress,
    timestamp: new Date().toISOString(),
  };

  const deploymentsDir = path.join(__dirname, "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const deploymentFile = path.join(
    deploymentsDir,
    `deployment-${network.name}-${Date.now()}.json`
  );
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));

  console.log("\n📝 Deployment info saved to:", deploymentFile);
  console.log("\n📋 Copy this to your .env.local:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);
  console.log(`NEXT_PUBLIC_NETWORK_CHAIN_ID=${network.chainId}`);

  // Also save latest deployment
  const latestFile = path.join(deploymentsDir, `latest-${network.name}.json`);
  fs.writeFileSync(latestFile, JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


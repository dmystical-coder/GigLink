# GigLink Smart Contracts

This directory contains all smart contract code for the GigLink decentralized bounty marketplace, built with Hardhat.

## 📁 Structure

```
smart-contracts/
├── contracts/
│   ├── BountyMarketplace.sol    # Main marketplace contract
│   └── interfaces/
│       └── IBountyMarketplace.sol  # Interface definition
├── scripts/
│   ├── deploy.ts                # Basic deployment script
│   └── deploy-with-config.ts    # Deployment with config saving
├── test/                        # Test files (to be added)
├── hardhat.config.ts           # Hardhat configuration
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

From the project root directory:

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root with:

```env
PRIVATE_KEY=your_private_key_here
BASESCAN_API_KEY=your_basescan_api_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here (optional)
```

## 📝 Available Scripts

All scripts should be run from the `smart-contracts/` directory:

```bash
# Compile contracts
npm run compile

# Run tests
npm run test

# Deploy to local network
npm run deploy:local

# Deploy to Base Sepolia testnet
npm run deploy:base-sepolia

# Deploy to Base mainnet
npm run deploy:base

# Start local Hardhat node
npm run node

# Verify contract on Basescan
npm run verify -- --network baseSepolia <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

## 📄 Contract Overview

### BountyMarketplace.sol

The main contract implementing the decentralized bounty marketplace with the following features:

- **Bounty Creation**: Create bounties with escrowed ETH or ERC20 tokens
- **Application System**: Workers can apply to open bounties
- **Assignment**: Issuers can assign bounties to applicants
- **Work Submission**: Assignees submit their work
- **Completion & Payment**: Issuers approve work and release payment (with 2.5% platform fee)
- **Cancellation**: Issuers can cancel open bounties for a refund
- **Token Whitelist**: Optional token whitelisting for rewards

### Key Features

- ✅ ReentrancyGuard protection
- ✅ OpenZeppelin Ownable for admin functions
- ✅ Supports ETH and ERC20 token payments
- ✅ Platform fee (2.5%) collected on completion
- ✅ Comprehensive event emissions for frontend integration

## 🔒 Security Features

- ReentrancyGuard on state-changing functions
- Access control with OpenZeppelin Ownable
- Input validation on all user inputs
- Safe token transfers using SafeERC20

## 🧪 Testing

Tests should be written in the `test/` directory. Run tests with:

```bash
npm run test
```

## 📦 Deployment

### Base Sepolia (Testnet)

1. Get testnet ETH from [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
2. Deploy:
   ```bash
   npm run deploy:base-sepolia
   ```
3. The deployment script will save the contract address to `deployments/` directory

### Base Mainnet

⚠️ **Be careful with mainnet deployments!**

1. Ensure you have enough ETH for gas
2. Double-check your environment variables
3. Deploy:
   ```bash
   npm run deploy:base
   ```

## 🔗 Contract Integration

After deployment, update your frontend configuration:

1. Copy the contract address from deployment output
2. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_CONTRACT_ADDRESS=<contract_address>
   ```
3. Import the ABI from `artifacts/contracts/BountyMarketplace.sol/BountyMarketplace.json`

## 📚 Contract ABI

The compiled ABI will be available at:
```
artifacts/contracts/BountyMarketplace.sol/BountyMarketplace.json
```

You can copy this ABI to your frontend project for contract interaction.

## 🛠 Development

### Local Development

1. Start local Hardhat node:
   ```bash
   npm run node
   ```
2. In another terminal, deploy to localhost:
   ```bash
   npm run deploy:local
   ```

### Verifying Contracts

To verify on Basescan after deployment:

```bash
npx hardhat verify --network baseSepolia <CONTRACT_ADDRESS> <OWNER_ADDRESS>
```

## 📖 Additional Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Base Network Docs](https://docs.base.org)

## 🤝 Contributing

When adding new contracts:

1. Place them in the `contracts/` directory
2. Write tests in `test/`
3. Update this README if adding new features
4. Ensure all tests pass before deployment

---

**Built for Base Network** 🟦


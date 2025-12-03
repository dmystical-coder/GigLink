# GigLink ⚡️

**Decentralized Micro-Bounties for the Atomic Economy.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active_development-green.svg)
![Network](https://img.shields.io/badge/network-Base_Mainnet-0052FF.svg)
![Reown](https://img.shields.io/badge/built_with-Reown_AppKit-3396FF.svg)

[**Live Demo**](https://giglink.vercel.app) | [**Report Bug**](https://github.com/your-username/giglink/issues) | [**Request Feature**](https://github.com/your-username/giglink/issues)

## 📖 About

**GigLink** is a lightweight, decentralized task marketplace built on **Base**. It allows developers, designers, and creators to post "atomic" tasks (micro-bounties) and get paid instantly in crypto upon completion.

Unlike traditional freelance platforms, GigLink focuses on speed and sovereignty. There are no middlemen—just smart contracts, **Basename** identities, and direct peer-to-peer settlement.

### 🌟 Key Features (Roadmap)
* **Connect & Go:** Seamless onboarding using **Reown AppKit** (formerly WalletConnect).
* **Identity First:** Native integration with **Basenames** to verify reputation.
* **Atomic Escrow:** Bounties are locked on-chain and released only when work is verified.
* **Zero-Friction Payouts:** Instant settlement on the Base L2 network (low fees, high speed).
* **Detailed Bounty View:** Rich markdown descriptions, required skills, and reward breakdown.
* **Web3 Submission Flow:** Connect wallet, switch network, and apply for bounties seamlessly.

---

## 🛠 Tech Stack

We are building on a modern, type-safe stack designed for performance and reliability.

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + ShadCN UI
* **Web3 Connectivity:** [Reown AppKit](https://reown.com/)
* **Blockchain Interaction:** Wagmi + Viem
* **Network:** Base (Sepolia & Mainnet)

---

## 🚀 Getting Started

Follow these steps to set up the environment locally.

### Prerequisites
* Node.js 18+
* npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/giglink.git](https://github.com/your-username/giglink.git)
    cd giglink
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup:**
    Duplicate the example env file:
    ```bash
    cp .env.example .env.local
    ```
    *Open `.env.local` and add your Reown Project ID (get one at [cloud.reown.com](https://cloud.reown.com)).*

    ```env
    NEXT_PUBLIC_PROJECT_ID=your_reown_project_id_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🤝 Contributing

We welcome contributions! Please follow the "Atomic Commit" philosophy:
1.  Fork the project.
2.  Create your feature branch (`git checkout -b feat/amazing-feature`).
3.  Commit your changes (`git commit -m 'feat: add some amazing feature'`).
4.  Push to the branch (`git push origin feat/amazing-feature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Built with ❤️ for the Base Ecosystem.*

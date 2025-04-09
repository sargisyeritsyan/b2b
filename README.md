
# Local ERC-20 Token with Node.js API

This project allows you to:

- ✅ Deploy a custom ERC-20 token on a **local Hardhat network**
- ✅ Interact with the token via a **Node.js REST API** using [Viem](https://viem.sh/)

---

## 🧱 Tech Stack

- [Hardhat](https://hardhat.org/) – Local Ethereum dev environment
- [Viem](https://viem.sh/) – Ethereum client for JavaScript
- [Express.js](https://expressjs.com/) – Simple API server
- Solidity 0.8.x

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-repo/b2b.git
cd b2b
npm install



 Compile contract
npx hardhat compile

 Start local blockchain
npx hardhat node

 Open new terminal and deploy contract using Ignition
npx hardhat ignition deploy ignition/modules/MyTokenModule.cjs --network localhost

 Copy MyTokenModule#MyToken and paste to .env
    
 Start the API server
npm run start
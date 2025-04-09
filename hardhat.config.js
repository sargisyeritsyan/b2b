require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.28",
    defaultNetwork: 'localhost',
    networks: {
        sepolia: {
            url: "https://ethereum-sepolia-rpc.publicnode.com",
            accounts: ['PRIVATE KEY'],
        },
        localhost: {
            url: 'http://127.0.0.1:8545',
        },
    },
};

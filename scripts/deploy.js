const hre = require("hardhat")

async function main() {
    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy(2000);
    console.log("Token deployed to:", token.target || token.address);

    const [owner] = await hre.ethers.getSigners();

    const ownerBalance = await token.balanceOf(owner.address);
    console.log("Owner balance:", ownerBalance.toString());
    console.log("Owner address:", owner.address);
}

main()
    .then(() => console.log("Deployed successfully"))
    .catch(error => console.error(error))
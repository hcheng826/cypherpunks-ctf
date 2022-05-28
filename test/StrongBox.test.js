const { ethers } = require("hardhat");
const hre = require('hardhat');

describe.only("Strong Box", function () {
  it("test", async function () {
    const provider = hre.network.provider;
    const [player, deployer, client] = await hre.ethers.getSigners();

    const guardFactory = await ethers.getContractFactory("Guard");
    const guard = await guardFactory.connect(deployer).deploy();
    await guard.deployed();

    const sbFactory = await ethers.getContractFactory("StrongBox");
    const sb = await sbFactory.connect(deployer).deploy(guard.address);
    await sb.deployed();
  });
});

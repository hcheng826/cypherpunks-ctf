const { ethers } = require("hardhat");
const hre = require('hardhat');

describe.only("Test", function () {
  it("test", async function () {
    const provider = ethers.provider;
    const [deployer, player] = await hre.ethers.getSigners();

    const testFactory = await ethers.getContractFactory("Test1");
    const test = await testFactory.connect(deployer).deploy();
    await test.deployed();

    console.log('test1 addr: ', test.address);
    console.log('test2 addr: ', await test.test2Addr());

    const test2 = await ethers.getContractAt(
      require('../artifacts/contracts/Test.sol/Test2.json').abi,
      await test.test2Addr(),
      player
    );

    console.log('test2 testAddr:', await test2.testAddr());
  });
});

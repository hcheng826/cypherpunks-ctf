const { ethers } = require("hardhat");
const hre = require('hardhat');

describe("MorganStark", function () {
  it("deploy", async function () {
    const provider = hre.network.provider;

    const MSFactory = await ethers.getContractFactory("MorganStark");
    const ms = await MSFactory.deploy();
    await ms.deployed();

    console.log('ms address: ', ms.address);
    console.log('balance: ', (await ms.balance()).toString());
    console.log('MorganStark balance: ', (await provider.send('eth_getBalance', [ms.address])));
    console.log('MorganStark checkBalance: ', (await ms.checkBalance()).toString());

    const MorganStarkAttackFactory = await ethers.getContractFactory("MorganStarkAttack");
    const MorganStarkAttack = await MorganStarkAttackFactory.deploy({ value: ethers.utils.parseEther('0.1') });
    await MorganStarkAttack.deployed();

    const txRes = await MorganStarkAttack.attack(ms.address, { value: ethers.utils.parseEther('0.1') });
    await txRes.wait();

    console.log('balance: ', (await ms.balance()).toString());
    console.log('MorganStarkAttack balance: ', (await provider.send('eth_getBalance', [MorganStarkAttack.address])));
    console.log('MorganStark balance: ', (await provider.send('eth_getBalance', [ms.address])));
  });
});

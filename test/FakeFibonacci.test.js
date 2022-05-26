const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require('hardhat');

describe.only("Fake Fibonacci", function () {
  it("test", async function () {
    const provider = hre.network.provider;
    const [signer] = await hre.ethers.getSigners();

    const ffLibFactory = await ethers.getContractFactory("FakeFibonacciLib");
    const ffLib = await ffLibFactory.deploy();
    await ffLib.deployed();

    const ffFactory = await ethers.getContractFactory("FakeFibonacciBank");
    const ff = await ffFactory.deploy(ffLib.address, { value: ethers.utils.parseEther('1')});
    await ff.deployed();

    console.log('ffLib deploy tx', (await ffLib.deployTransaction.wait()).gasUsed);
    console.log('ff deploy tx', (await ff.deployTransaction.wait()).gasUsed);

    console.log('ff address', ff.address);
    console.log('ff balance', ethers.BigNumber.from(await provider.send('eth_getBalance', [ff.address])).toString());

    // const withdrawTx = await ff.withdraw();
    // await withdrawTx.wait();

    console.log('fakeFibonacciLibrary', await ff.fakeFibonacciLibrary());
    console.log('calculatedFibNumber', await ff.calculatedFibNumber());
    console.log('start', await ff.start());
    console.log('withdrawalCounter', await ff.withdrawalCounter());
    // console.log('FIBSIG', await ff.FIBSIG()); // need to make it public variable to print this

    await signer.sendTransaction({
      to: ff.address,
      from: signer.address,
      data: '0xfdb5a03e',
      // value: ethers.utils.parseEther('0.1')
    });

    console.log('start', await ff.start());
    console.log('fakeFibonacciLibrary', await ff.fakeFibonacciLibrary());
  });
});

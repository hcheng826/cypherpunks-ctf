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

  // We get the contract to deploy
  const Fomo4DAttackFactory = await hre.ethers.getContractFactory("Fomo4DAttack");
  const Fomo4DAttack = await Fomo4DAttackFactory.deploy('0xf3a623133a9811c211f6924ea35698230addae77');

  await Fomo4DAttack.deployed();

  console.log("Fomo4DAttack deployed to:", Fomo4DAttack.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

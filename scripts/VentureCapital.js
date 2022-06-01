const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const [player] = await hre.ethers.getSigners();
  const provider = ethers.provider;

  // /* pre compute the target address
  // const deployerAddr = '0x433ea2726686c1a4b9fcb0d48c03f261d922b3fb';
  // const preComputedVCAddr = ethers.utils.getContractAddress({
  //     from: deployerAddr,
  //     nonce: await provider.getTransactionCount(deployerAddr)
  // });
  // console.log('preComputedVCAddr:', preComputedVCAddr);

  // const preComputedDAAddr = ethers.utils.getContractAddress({
  //     from: preComputedVCAddr,
  //     nonce: 1
  // });
  // console.log('preComputedDAAddr:', preComputedDAAddr);
  // // */

  // // /* send ether to precomputed address
  // const tx = await player.sendTransaction({
  //   from: player.address,
  //   to: preComputedDAAddr,
  //   value: ethers.utils.parseEther('0.424242')
  // });
  // await tx.wait();
  // */

  const da = await ethers.getContractAt(
    require('../artifacts/contracts/VentureCapital.sol/DeveloperAuthorizer.json').abi,
    '0xFD6557f196E3d86b22CeCE15DE476F98f8C0D797',
    player
  );

  // const turnOffTx = await da.connect(player).turnOff({ value: ethers.utils.parseEther('0.575758') });
  // await turnOffTx.wait();

  console.log(await da.developerMode());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const [player] = await hre.ethers.getSigners();
  const provider = ethers.provider;

  /* pre compute the target address
  const deployerAddr = '0x433ea2726686c1a4b9fcb0d48c03f261d922b3fb';
  const preComputedVCAddr = ethers.utils.getContractAddress({
      from: deployerAddr,
      nonce: await provider.getTransactionCount(deployerAddr)
  });
  console.log('preComputedVCAddr:', preComputedVCAddr);

  const preComputedDAAddr = ethers.utils.getContractAddress({
      from: preComputedVCAddr,
      nonce: 1
  });
  console.log('preComputedDAAddr:', preComputedDAAddr);
  */

  /* send ether to precomputed address
  const tx = await player.sendTransaction({
    from: player.address,
    to: preComputedDAAddr,
    value: ethers.utils.parseEther('1')
  });
  await tx.wait();
  */
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

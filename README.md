### Obstacles
1. Can not use Rospten

Ropsten being deprecated.
https://discord.com/channels/714888181740339261/885976962894549023/979576665082564608
The deployment of contract itself exceed the block gas limit. Will use local hardhat network to complete the remaining challenges

2. Venture Captical

Can bypass the check for `isManager` by sending the ether to the pre-computed address and turn on developer auth mode. But could only get a little money (100 wei) out each transaction. Couldn't find the way to quickly hack all the money.

### Solutions
1. Bank

Underflow the balance (29 - 30 = 2**256-1).

2. Encrypt

XOR 2 same things is 0.

3. FreeShop

Use fallback function to make a reentrancy attack. Before the state is change, call the withdraw function recursively.

4. University

Need to calculate the storage slot for the contract. Then read the state change on the deployment transaction. And find the content in the private array name[2].

5. Fake Fibonacci

Use delegateCall to change the calling contract's content. Change the lib address to the attacking contract.

6. PaperScissorsStone

Creating an attacking contract to compute the current bloch hash and call the `guess` method with the answer. The block number of the attacking contract and paper scissors stone contract is the same so the answer is always correct.

7. Fomo4D

`extcodesize` is used to check the code size of an address to check if it's a contract address. EOA code size should be 0. But calling in contructor can bypass this check, since in the contructing process the code size is 0.

8. MroganStark

use `selfdestruct`

9. Venture Capital

Can bypass the check for `isManager` by sending the ether to the pre-computed address and turn on developer auth mode. Then observe that newClient function could be utilized to change the contract `owner` by setting the age to the decimal format of player address. Finally try to pass all the `require`s in the `close()` method.

10. Strong Box

Deploy the contract and decompile it from the bytecode. Try to understand the assembly-like code and turn the complete variable to true.

11. Dragon

attackWings: random generate wallet with private key and try to match the address with `'42b100d'`.
attackTail: to pass `keccak256(_secrect)) == dragonDen`. `_secret` should be the public key of `dragonDen` wallet.
attackHead: to get the private key of the address `owner`. Observe that the address sent 2 transactions with same `'k'` value. Use the ECDSA to recover the
(reference: https://bitcoin.stackexchange.com/questions/35848/recovering-private-key-when-someone-uses-the-same-k-twice-in-ecdsa-signatures)

12. Crosslink Ship

Call the method `dropShipAnchor` with the smallest block number with 50000 from the latest block now. After the block is reached, call `pullAnchor`. Decompile the contract: https://ropsten.etherscan.io/bytecode-decompiler?a=0xe7a3ab3373affaaabf0e3212b713aea584adae1e
```
def _fallback() payable: # default function
  require block.number >= 12370017
  selfdestruct(caller)
```
So the `.call()` operation would destroy the contract and thus pass the check in `sailAway()`

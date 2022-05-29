### Obstacles
1. Can not use Rospten

Ropsten being deprecated.
https://discord.com/channels/714888181740339261/885976962894549023/979576665082564608
The deployment of contract itself exceed the block gas limit. Will use local hardhat network to complete the remaining challenges

2. Venture Captical

Can bypass the check for `isManager` by sending the ether to the pre-computed address and turn on developer auth mode. But could only get a little money (100 wei) out each transaction. Couldn't find the way to quickly hack all the money.

3. Strong Box

Need the deployment script (which include the solution clues)

4. Dragon

Couldn't find the script for `setAccount`: https://github.com/cypherpunks-core/cypherpunks-ctf/search?q=setAccount


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

Can bypass the check for `isManager` by sending the ether to the pre-computed address and turn on developer auth mode.
TODO: need to fina a way to hack all the money faster

10. Strong Box

Deploy the contract and decompile it from the bytecode. Try to understand the assembly-like code and turn the complete variable to true.

11. Dragon

12. Crosslink Ship


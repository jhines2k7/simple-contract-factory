// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleContract {
    string public name;

    constructor(string memory _name) public {
        name = _name;
    }
}

contract SimpleContractFactory {
    SimpleContract[] public deployedContracts;

    function createSimpleContract(string memory _name) public {
        SimpleContract simpleContract = new SimpleContract(_name);
        deployedContracts.push(simpleContract);
    }

    function getDeployedContracts() public view returns (SimpleContract[] memory){
        return deployedContracts;
    }
}
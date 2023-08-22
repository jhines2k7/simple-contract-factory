const SimpleContractFactory = artifacts.require("SimpleContractFactory");

module.exports = function (deployer) {
  deployer.deploy(SimpleContractFactory);
};
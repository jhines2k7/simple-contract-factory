const SimpleContractFactory = artifacts.require('SimpleContractFactory');
const SimpleContract = artifacts.require('SimpleContract');

contract('SimpleContractFactory', (accounts) => {
  let factory;

  beforeEach(async () => {
    factory = await SimpleContractFactory.new(); // Create a new factory before each test
  });

  it('deploys a factory contract', async () => {
    assert.ok(factory.address);
  });

  it('factory contract can create a new simple contract and store the address', async () => {
    await factory.createSimpleContract('MyContract');

    const deployedContracts = await factory.getDeployedContracts();
    assert.equal(deployedContracts.length, 1);

    const simpleContract = await SimpleContract.at(deployedContracts[0]);
    const contractName = await simpleContract.name();

    assert.equal(contractName, 'MyContract');
  });

  it('factory contract can create multiple simple contracts and store their addresses', async function () {
    const contractNames = ['Contract1', 'Contract2', 'Contract3'];
    
    for (let i = 0; i < contractNames.length; i++) {
      await factory.createSimpleContract(contractNames[i]);
      const deployedContracts = await factory.getDeployedContracts();
      
      // Check if the number of deployed contracts is correct.
      assert.equal(deployedContracts.length, i + 1);

      const simpleContract = await SimpleContract.at(deployedContracts[i]);
      const contractName = await simpleContract.name();

      // Check if the name of each contract is correct.
      assert.equal(contractName, contractNames[i]);
    }
  });

  it('factory contract can create multiple simple contracts and print their addresses', async function () {
    const contractNames = ['Contract1', 'Contract2', 'Contract3'];
    
    for (let i = 0; i < contractNames.length; i++) {
      await factory.createSimpleContract(contractNames[i]);
      const deployedContracts = await factory.getDeployedContracts();
      
      console.log(`Address of ${contractNames[i]}: ${deployedContracts[i]}`);

      const simpleContract = await SimpleContract.at(deployedContracts[i]);
      const contractName = await simpleContract.name();

      // Check if the name of each contract is correct.
      assert.equal(contractName, contractNames[i]);
    }
  });
});
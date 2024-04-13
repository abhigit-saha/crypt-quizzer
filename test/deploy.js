const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Entry = await ethers.getContractFactory("Entry");
  const entry = await Entry.deploy();  //instance

  console.log("Entry address:", entry.address);



  const amount = {value:hre.ethers.utils.parseEther("1")}
  await contract.connect(from1).setEntryFee("2")
}

async function consoleBalances(addresses){
  let(counter=0);
  for (const address of addresses){
    console.log('Address ${counter} balance:', await getBalances(address));
  }
}

async function consoleMemos(memos){
  for(const memo of memos){
      const timestamp = memo.timestamp;
      const name = memo.name;
      const from = memo.from;
    console.log('At ${timestamp}, name ${name}, address ${address}');

  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

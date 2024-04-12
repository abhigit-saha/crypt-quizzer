const { expect } = require("chai");

describe("Entry", function () {
  it("Should set the entry fee", async function () {
    const Entry = await ethers.getContractFactory("Entry");
    const entry = await Entry.deploy();
    await entry.deployed();

    const newEntryFee = 100;
    await entry.setEntryFee(newEntryFee);

    expect(await entry.getEntryFee()).to.equal(newEntryFee);
  });

  // Add more tests as needed
});

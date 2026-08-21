const {ethers} = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);

module.exports = provider;

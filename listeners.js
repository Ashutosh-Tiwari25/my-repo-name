const {ethers} = require("ethers");
const provider = require ("./provider");
const db  = require("./database");

const contractaddress = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B1";

const erc20Abi = ["event Transfer(address indexed from, address indexed to, unint256 value)"];

const contract = new ethers.contract(contractAddress, erc20Abi, provider);
function startListening(){
    contract.on("Transfer", (from, to, value, event)=>{
        console.log("Transfer detected!");
        console.log("From:", from);
        console.log("To", to);
        console.log("Value", value.toString());
    
        db.prepare(`
            INSERT INTO transfers(from_address, to_address, value, tx_hash)
            VALUES(?, ?, ?, ?)
            `).run(from, to, value.toString(), event.log.transactionHash);

        });

    console.log("Listening to transfer events...");
} 

module.exports = startListening;
const {ethers} = require("ethers");
const provider = require ("./provider");
const db  = require("./database");

const contractAddress = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B1";

const erc20Abi = ["event Transfer(address indexed from, address indexed to, unint256 value)"];

const contract = new ethers.contract(contractAddress, erc20Abi, provider);
function startListening(){
    contract.on("Transfer", (SenderAddress, ReceiverAddress, transfferedAmount, event)=>{
        console.log("Transfer detected!");
        console.log("SenderAddress:", SenderAddress);
        console.log("ReceiverAddress", ReceiverAddress);
        console.log("Value", value.toString());
    
        const insertTransfer = db.prepare(`
            INSERT INTO transfers(from_address, to_address, value, tx_hash)
            VALUES(?, ?, ?, ?)
            `).run(SenderAddress, ReceiverAddress, value.toString(), event.log.transactionHash);

        });

    console.log("Listening to transfer events...");
} 

module.exports = startListening;
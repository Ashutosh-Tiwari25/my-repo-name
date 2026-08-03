const express = require("express");
const {ethers} = require("ethers");
const jwt = require("jsonwebtoken");
const app = express();
const jwt_secret = "your secret key";
app.use(express.json());

const database = {};
const nonceStore = {};
const nonce_expiry = 5 * 60 * 1000;  // valid for only 5 minutes 

function get_message (req,res){
    const address = req.body.address;

    const nonce = Math.floor(Math.random()* 1000000)+ "-" + Date.now();
    const expiresAt = Date.now() + nonce_expiry;

    nonceStore[address] = {nonce: nonce, expiresAt: expiresAt};

    const message = `Sign this message to log in: ${nonce}`;
    return res.json({message});
}

function verifySignature(req,res){
    const message = req.body.message;
    const signature = req.body.signature;
    const address = req.body.address;

    const storednonce = nonceStore[address];

    if (!storednonce){
        return res.send("No nonce found. Kindly, login again");
    }

    if(Date.now()> nonceStore.expiresAt){
        delete nonceStore[address];
        return res.send("Nonce expired, kindly login again");
    }

    if (message.indexOf(storednonce)=== -1){
        return res.send("Nonce do not match. Possibly a replay attack");
    }

    try{
    const recoveredAddress = ethers.verifyMessage(message, signature);
    } catch(error){
        console.log("error verifying singature:", error.message);
        return res.send("Invalid signature");
    }

    if (recoveredAddress.toLowerCase() === address.toLowerCase()){

        delete nonceStore[address];

        const token = jwt.sign({address: address}, jwt_secret, {expiresIn: "1h"})
        return res.json({ message: "Wallet verified", token: token });
    }
    return res.send("Signature Verification failed");
}

app.post("/web3/message", get_message);
app.post("/web3/verify", verifySignature);

app.listen(3000, ()=> {
    console.log("server running live on http://localhost:3000");
})
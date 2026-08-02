const express = require("express");
const {ethers} = require("ethers");
const jwt = require("jsonwebtoken");
const app = express();
const jwt_secret = "your secret key";
app.use(express.json());

const database = {};
const nonceStore = {};

function get_message (req,res){
    const address = req.body.address;

    const nonce = Math.floor(Math.random()* 1000000)+ "-" + Date.now();

    nonceStore[address] = nonce;

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
    if (message.indexOf(storednonce)=== -1){
        return res.send("Nonce do not match. Possibly a replay attack");
    }

    const recoveredAddress = ethers.verifyAuthorization(message, signature);
    if (recoveredAddress.toLowerCase() === address.toLowerCase()){

        delete nonceStore[address];

        const token = jwt.sign({address: address}, jwt_secret, {expiresIn: "1h"})
        return res.send("signature verification failed");
    }
}

app.get("/web3/message", get_message);
app.post("/web3/verify", verifySignature);

app.listen(3000, ()=> {
    console.log("server running live on http://localhost:3000");
})
const jwt = reuire("jsonwebtoken");
const express = require ("express");
const {ethers} = require ("ethers");

const jwt_secret = "your_secret_key_that_is_used";

function getMessage(req,res){
    const message = `Sign this message to log in : ${Date.now()}`;
    return res.json({message});
};

function verifySignature(req,res){

    const message = req.body.message;
    const signature = req.body.signature;
    const address = req.body.address;

    const recoveredAddress = ethers.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase()===address.toLowerCase()){
        const token = jwt.sign({address}, jwt_secret, {expiresIn: "1h"});
        return res.json({message:"Wallet verified", token});
    };
    return res.send("SIGNATURE VERIFICATION FAILED");
}

app.get("/web3/message", getMessage);
app.post("/web3/verify", verifySignature);
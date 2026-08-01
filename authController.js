const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");
const {ethers} = require("ethers");
const {db} = require ("./database");
const { verify_token, jwt_secret } = require("./authMiddleware");

async function signup(req,res) {
    const username = req.body.username;
    const password = req.body.password;

    if(!username){
        return res.send("username required");
    }

    if(!password){
        return res.send("password required");
    }

    const exist = db.prepare("SELECT * FROM users WHERE username = ?"). get(username);

    if(exist){
        return res.send("username already exist");
    }
    const hashedpassword = await bcrypt.hash(password,10);

    const insert = db.prepare("INSERT INTO users(username,password)VALUES (?,?)").run(username, hashedpassword);

    return res.send ("Signup Successful");
};

async function login (req,res) {
    const username = req.body.username;
    const password = req.body.password;

    const exist = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

    if(!exist){
        return res.send("username does not exist");
    }

    const isMatch = await bcrypt.compare(password, exist.password);

    if(!isMatch){
        return res.send("wrong password");
    }

    const token = jwt.sign({username: exist.username}, jwt_secret, {expiresIn: "1h"});
    return res.json({message: "Welcome to Instagram", token});
    
}; 

function show_profile(req,res){
    return res.send (`Welcome back, ${req.user.username || req.user.address}`);
};

function get_message(req,res){
     const message = 'Sign this message to log in ${Date.now()}'
     return res.json({message});
};

function verifySignature(req,res){
    const message = req.body.message;
    const address = req.body.address;
    const signature = req.body.signature;

    const recoveredAddress = ethers.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() === address.toLowerCase()){
        const token = jwt.sign({address}, jwt_secret, {expiresIn: "1h"});
        return res.json({message:"wallet verified", token});
    };

    return res.send("Signature verification failed");
};

module.exports = {signup, login, show_profile, get_message, verifySignature};

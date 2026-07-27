const express = require("express");
const bcrypt = require("bcrypt");
const Database = require("better-sqlite3");
const jwt = require("jsonwebtoken");
const app = express();
const db = new Database("users.db");

app.use(express.json());

const jwt_secret = "this_is_secret_key";

db.prepare(`
        CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`).run();

async function signup(req,res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username){
        return res.send("Username required")
    };

    if (!password){
        return res.send("password required")
    };

    const exist = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

    if (exist){
        return res.send("username already exist");
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const insert = db.prepare("INSERT INTO users (username, password) VALUES(?,?) ").run(username, hashedpassword)

    return res.send("signUP successul");
    
};

async function login(req,res) {
    const username = req.body.username;
    const password = req.body.password;

    const exist = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

    if (!exist){
        return res.send("Username not found")
    };

    const isMatch = await bcrypt.compare(password, exist.password);

    if (!isMatch){
        return res.send("wrong password")
    };

    const token = jwt.sign({username : exist.username}, jwt_secret, {expiresIn:"1h"});

    return res.json({message: "Welcome to Instagram" , token: token});
    
};

async function profile(req,res) {
    const authHeader = req.body.authorization;

    if (!authHeader){
        return res.send("No token provided")

    };

    const token = authheader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, jwt_secret);

        return res.send(`welcome back , ${decoded.username}`);
    }
    catch(err){
        return res.send("Invalid or expired token")
    };

};

app.post("/signup", signup);
app.post("/login", login);
app.get("/profile", profile);

app.listen(3000, ()=> {
    console.log("server running on http://localhost:3000");
});
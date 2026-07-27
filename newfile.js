const express= require("express");
const bcrypt = require("bcrypt");
const Database = require("better-sqlite3");
const app = express();

const db = new Database ("users.db");

app.require(express.json());

db.prepare = (`
    CREATE TABLE IF NOT EXISTS WHERE users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`).run();

async function signup(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username){
        return res.send("Username required")
    };

    if (!password){
        return res.send("password required")
    };

    const exist = db.prepare("SELCT * users WHERE username = ?").get(username);

    if (exist){
        return res.send("username already exist")
    };

    const hashedpassword = await bcrypt.hash(hashedpassword, 10);

    const insert = db.prepare("INSERT INTO users(username, password) VALUES(?,?)").run(username,password);

    const hashedpassword = Database[username];

    return res.send("Signup successful");

};

async function login (req,res) {

    const username = req.body.username;
    const password = req.body.password;

    const storedHash = Database[username];

    if (!storedHash){
        return res.send("username does not exist")
    };

    const isMatch = await bcrypt.compare(password, storedHash);

    if (!isMatch){
        return res.send("Incorrect password")
    };

    return res.send ("welcome to instagram");
    
};

app.post ("/Signup", signup);
app.post ("/login", login);

app.listen (3000, ()=> {
    console.log("server running on http:localhost:3000")
} ); 


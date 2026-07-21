const express = require ("express");
const bcrypt = require ("bcrypt");
const Database = require("better-sqlite3");
const app = express();
const db = new Database ("users.db");

app.use(express.json());

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`).run();

async function signup(req,res) {
    const username = req.body.username ;
    const password = req.body.password;

    if (!username){
        return res.send("Username required")
    };

    if (!password){
        return res.send("password required")
    };

    const exist = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

    if (exist){
        return res.send("username is already taken")
    };

    const hashedpassword = await bcrypt.hash(password, 10);

    const insert  = db.prepare("INSERT INTO USERS(username, password) VALUES(?,?)").run(username, hashedpassword);
    
    return res.send("SignUp successful");
    
};

async function login(req,res) {

    const username = req.body.username;
    const password = req.body.password;

    const exist = db.prepare("SELECT * FROM users WHERE username= ?").get(username);

    if (!exist){
        return res.send("username does not exist")
    };

    const isMatch = await bcrypt.compare(password, exist.passwordqu);

    if (!isMatch){
        return res.send("wrong password")
    };

    return res.send("Welcome to Instagram")
    
};

function show_profile(req,res){
    return res.send("Your profile")
};

app.post("/signup", signup);
app.post ("/login", login);
app.get("/profile", show_profile);

app.listen(3000, ()=> {
     console.log("server running on port http://localhost:3000");
});

const express = require("express");
const app = express();
const bcrypt = require ("bcrypt");
app.use(express.json());

const database = {};
 async function signup(req,res){
    
    const username = req.body.username;
    const password = req.body.password;

    if (!username){
        return res.send("username required")
    };

    if (!password){
        return res.send("password required")
    };

    if (database[username]){
        return res.send("username already exists")
    };
    const hashedpassword = await bcrypt.hash(password, 10);
    database[username] = {password: hashedpassword};

    return res.send("Signup successful")
}

async function login(req, res){
    const username = req.body.username;
    const password = req.body.password;

    if (!database[username]){
        return res.send("username does not exist")
    };

    const isMatch = await bcrypt.compare(password, database[username].password);

    if (isMatch){
        return res.send("welcome to Instagram")
    }

    return res.send("wrong password")
};

function show_profile(req, res){
    return res.send("your profile")
};

app.post("/signup", signup);
app.post("/login", login);
app.get ("/profile" , show_profile);

app.listen(3000, ()=> {
    console.log("server is live working on http://localhost:3000");
})
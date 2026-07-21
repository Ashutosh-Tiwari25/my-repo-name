const express = require("express");
const app = express();

app.use(express.json());

const database = {
    Ashutosh :{password:"12345"},
    Rahul :{password:"34567"}
};
function show_profile (req, res){
    res.send ("Your profile")
};

function login(req, res){
   
    const username = req.body.username;
    const password = req.body.password;

    if (!database[username]){
        return res.send ("username not found")
    };

    if (database [username].password === password){
        return res.send("Welcome to jinstagram")
    };

    return res.send("wrong password");

};

app.get("/profile", show_profile);
app.post("/login", login);

function signup(req,res){
    const username = req.body.username;
    const password = req.body.password;

    if (!username){
        return res.send("Username required")
    };
    if (!password){
        return res.send("password required")
    };
    if (database[username]){
        res.send("username already in database")
    };
    database[username] = {password: password};

    return res.send("signup successfull");
}

app.post("/signup", signup);

app.listen(3000, ()=> {
    console.log("Server working live on https//:localhost3000")
});

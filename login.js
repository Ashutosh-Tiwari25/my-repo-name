const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
app.use(express.json());

const database = {

};

async function loginn(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!database[username]){
        return res.send("Username not found")
    };

    const isMatch = await bcrypt.compare(password, database[username].password);

    if (isMatch){
        return res.send("welcome to jinstagram")
    };
    
    return res.send ("wrong password");
}

app.post("/loginn", loginn);

app.listen(3000, ()=> {
    console.log("running live on https://localhost3000")
});
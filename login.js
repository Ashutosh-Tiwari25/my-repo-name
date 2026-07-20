const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
app.use(express.json());

database = {
    Ashutosh : {password: 12345},
    Rahul : {password: 4567},
};

async function loginn(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!database[username]){
        return res.send("Username not found")
    };

    const isMatch = await bcrypt.compare(password, username[database].password);

    if (isMatch){
        return res.send("welcome to jinstagram")
    };
    
    return res.send ("wrong password");
}

app.get ("/loginn", loginn);

app.listen(3000, ()=> {
    console.log("running live on https://localhost3000")
});
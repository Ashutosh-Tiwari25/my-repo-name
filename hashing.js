const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
app.use(express.json());
const database = {
    Ashutosh : {password : 1234 },
    Rahul : {password : 3456},
};
async function signup(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        if (!username){
            return res.send("username required")
        };

        if (!password){
            return res.send("password required")
        };

        if (database[username]){
            return res.send ("username already in database")
        };

        const hashedpassword = await bcrypt.hash(password , 10);

        database[username] = {password : hashedpassword}

        return res.send ("signup succesufull")
}

app.post("/signup", signup);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
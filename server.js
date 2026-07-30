const express = require("express");

const authRoutes = require("./authRoutes");

const app = express();
app.use(express.json());

app.use("/", authRoutes);

app.listen(3000, ()=>{
    console.log("Server running live on http:localhost:3000");
})
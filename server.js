const express = require("express");
const authRoutes = require("./authRoutes");
const transferRoutes = require("./transferRoutes");

const app = express();
app.use(express.json());

app.use("/", transferRoutes);

app.use("/", authRoutes);

app.listen(3000, ()=>{
    console.log("Server running live on http://localhost:3000");
})

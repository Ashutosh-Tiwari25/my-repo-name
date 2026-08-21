const express = require("express");
const router = express.Router();

const {
    getTransfer
} = require("./transferController");

router.get("/transfer", getTransfer);

module.exports = router;
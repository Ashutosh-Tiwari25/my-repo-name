const express = require("express");
const router = express.router();

const{signup, login, show_profile, get_message, verifySignature} = require("./authController");
const { verify_token } = require("./authmiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", verify_token, show_profile);
router.get("/web3message", get_message);
router.post("/web3Verify", verifySignature);

module.exports = router;

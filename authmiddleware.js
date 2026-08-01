const jwt = require("jsonwebtoken");
const jwt_secret = "your_secret_key";

function verify_token(req,res,next){
const authHeader= req.headers.authorization;

if(!authHeader){
    return res.send("no token provided");
}
const token  = authHeader.split(" ")[1];
try {
    const decoded = jwt.verify(token, jwt_secret);
    req.user= decoded;
    next();  
} catch (error) {
    return res.send("Invalid token")
};
};
module.exports= {verify_token, jwt_secret};

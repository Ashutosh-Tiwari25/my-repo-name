const db = require("./database");

function getTransfer(req,res){
    const transfers = db.prepare("SELECT* FROM transfers ORDER BY id DESC").all();

    return res.json(transfers);
}

module.exports = {getTransfer};


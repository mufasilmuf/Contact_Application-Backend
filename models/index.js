const mongoose = require("mongoose");
const dbconfig = require("../config/config");

const db = {};

db.mongoose = mongoose;
db.url = dbconfig.url;

db.users = require("../models/user.model")(mongoose);
db.contact = require("../models/contact.model")(mongoose);

module.exports = db;

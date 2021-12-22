const mongoose = require('mongoose');
require("dotenv").config()
const url1 = process.env.URL1;
const url2 = process.env.URL2;

const conn1 = mongoose.createConnection(url1);
const conn2 = mongoose.createConnection(url2)

module.exports = {conn1, conn2};
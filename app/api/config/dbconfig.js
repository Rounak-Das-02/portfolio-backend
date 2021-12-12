const mongoose = require('mongoose');

const url1 = 'mongodb://localhost/portfolioId';
const url2 = 'mongodb://localhost/portfolioId_Tokens';

const conn1 = mongoose.createConnection(url1);
const conn2 = mongoose.createConnection(url2)

module.exports = {conn1, conn2};
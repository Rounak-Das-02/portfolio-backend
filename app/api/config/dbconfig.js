const mongoose = require('mongoose');

const url = 'mongodb://localhost/portfolioId';

mongoose.connect(url);

module.exports = mongoose;
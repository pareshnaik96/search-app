const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  ID: Number,
  Name: String,
  CountryCode: String,
  District: String,
  Population: Number
});

module.exports = mongoose.model('Cities', citySchema);


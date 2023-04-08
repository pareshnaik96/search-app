const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    CountryCode: String,
    Language: String,
    IsOfficial: String,
    Percentage: Number
});

module.exports = mongoose.model('Language', languageSchema);


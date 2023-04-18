const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Code: String,
    Name: String,
    Continent: String,
    Region: String,
    SurfaceArea: Number,
    IndepYear: Number,
    Population: Number,
    LifeExpectancy: Number,
    GNP: Number,
    GNPOld: Number,
    LocalName: String,
    GovernmentForm: String,
    HeadOfState: String,
    Capital: Number,
    Code2: String
});

module.exports = mongoose.model('Countries', countrySchema);

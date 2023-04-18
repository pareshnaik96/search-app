const countryModel = require('../Models/countryModel');


//================================ get country controller =======================================================//


const getCountry = async function (req, res) {

    try {

        let query = req.query.q; // Get the search query from the request
        if (!query) return res.status(400).send({ status: false, message: "invalid query" })

        query = query.split("")
        query[0] = query[0].toUpperCase()
        query = query.join("")

        const keyword = query; // The keyword entered by the user
        const getDetails = await countryModel.find({ Name: { $regex: new RegExp(`^${keyword}`, "i") } }).exec();
        return resstatus(200).send({ status: true, message: "country get successfully", docs: getDetails })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}


module.exports = { getCountry }




const cityModel = require('../Models/cityModel')


//================================ get city controller =========================================================//


const getCountryByCity = async function (req, res) {

    try {

        let query = req.query.q; // Get the search query from the request
        if (!query) return res.status(400).send({ status: false, message: "invalid query" })

        query = query.split("")
        query[0] = query[0].toUpperCase()
        query = query.join("")

        const keyword = query; // The keyword entered by the user

        let getDetails = await cityModel.aggregate([
            {
                $lookup: {
                    from: "countries",
                    localField: "CountryCode",
                    foreignField: "Code",
                    as: "country"
                }
            },
            {
                $match: {
                    "Name": { $regex: new RegExp(`^${keyword}`, "i") }
                },
            }
        ])
        return res.status(200).send({ status: true, message: "city get successfully", docs: getDetails })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { getCountryByCity };

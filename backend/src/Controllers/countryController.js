const countryModel = require('../Models/countryModel');

//================================ get country controlletr =======================================================//


const getCountry = async function (req, res) {

    try {

        let query = req.query.q; // Get the search query from the request
        query = query.split("")
        query[0] = query[0].toUpperCase()
        query = query.join("")
        
        const keyword = query; // The keyword entered by the user
        const docs = await countryModel.find({ Name: { $regex: new RegExp(`^${keyword}`, "i") } }).exec();
        res.status(200).send({status:true, docs })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}


//=================================== get country details controller ===============================================//


const getDetails =async function (req, res) {

    try {
        const _id = req.params.id
        const details =await countryModel.findById({ _id })
        res.status(200).send({status:true, message:"fetch country details successfully",details })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.getCountry = getCountry;
module.exports.getDetails = getDetails;

const userModel = require('../Models/userModel');
const { generateOTP } = require('../services/otpGenerator');
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const { sendEmail } = require('../services/email');
const jwt = require('jsonwebtoken')


const isValid = function (value) {
    if (typeof value == "undefined" || value == null) return false;
    if (typeof value == "string" && value.trim().length == 0) return false;
    return true;
};

const isvalidRequestBody = function (requestbody) {
    return Object.keys(requestbody).length > 0;
}


//======================================= user signup controller ================================================//


const signUp = async function (req, res) {

    try {

        let data = req.body

        if (!isvalidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "data not found" });
        } else {
            const { firstname, lastname, gender, email, phone, } = data;

            if (!isValid(firstname)) {
                return res.status(400).send({ status: false, message: "firstname is required" });
            }
            if (!isValid(lastname)) {
                return res.status(400).send({ status: false, message: "lastname is required" });
            }
            if (!isValid(gender)) {
                return res.status(400).send({ status: false, message: "gender is required" });
            }
            if (!isValid(email)) {
                return res.status(400).send({ status: false, message: "email is required" });
            }
            if (!isValid(phone)) {
                return res.status(400).send({ status: false, message: "phone is required" });
            }

            let uniqueEmail = await userModel.findOne({ email });
            if (uniqueEmail) {
                return res.status(400).send({ status: false, message: "email already exist" });
            }

            if (!(/^[789]\d{9}$/).test(phone)) {
                return res.status(400).send({ status: false, message: "please enter a valid phone" });
            }
        }

        const createUser = await userModel.create(data)
        res.status(201).send({ status: true, message: "User signup successfully", data: createUser })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

// Connection setup for node-cache

async function cache(req, res) {
    let value = myCache.get("myKey");
    return value
}


//======================================= sendotp controller ====================================================//


const sendotp = async (req, res) => {

    try {

        const email = req.body.email

        let userEmail = await userModel.findOne({ email });
        if (!userEmail) {
            return res.status(400).send({ status: false, message: "user email not exist" });
        }

        const otp = generateOTP();

        req.otp = otp
        myCache.set("otp", otp, 1000)

        await sendEmail(req)

        return res.status(200).send({ status: true, message: "otp sent successfully", res: email, otp })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//========================================== user login controller ============================================//


const login = async function (req, res) {

    try {

        let email = req.body.email
        let otp = req.body.otp

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "email is required" });
        }

        let userEmail = await userModel.findOne({ email });
        if (!userEmail) {
            return res.status(400).send({ status: false, message: "user email not exist" });
        }
        if (myCache.get('otp') != otp)
            return res.status(400).send({ status: false, message: "invalid otp" });

        let userId = userEmail._id.toString()

        let token = jwt.sign({
            userId: userId,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 20 * 60 * 60
        }, "signature");

        return res.status(200).send({ status: true, message: "login successfully", token: token })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



module.exports.signUp = signUp;
module.exports.sendotp = sendotp;
module.exports.login = login;


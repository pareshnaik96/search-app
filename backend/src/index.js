const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const route = require('./Routes/route')

dotenv.config()
app.use(cors());
app.use(express.json());  //for converting the data into json
app.use(bodyParser.urlencoded({ extended: true })); //for encording the url


mongoose.connect("mongodb+srv://pareshnaik:W536yetBeRCk0yL8@cluster0.m9yz9.mongodb.net/World?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err))

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/', route);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});
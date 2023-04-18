const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController')
const countryController = require('../Controllers/countryController')
const languageController = require('../Controllers/languageController')
const cityController = require('../Controllers/cityController')



router.post('/api/signup', userController.signUp)
router.post('/api/sendotp', userController.sendotp)
router.post('/api/login', userController.login)

//api for get details of city with country,country details and language with country
router.get('/api/city', cityController.getCountryByCity)
router.get('/api/country', countryController.getCountry)
router.get('/api/language', languageController.getCountryByLanguage)



module.exports = router;



const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController')
const countryController = require('../Controllers/countryController')


router.post('/api/signup', userController.signUp)
router.post('/api/sendotp', userController.sendotp)
router.post('/api/login', userController.login)
router.get('/api/country', countryController.getCountry)
router.get('/api/details/:id', countryController.getDetails)



module.exports = router;



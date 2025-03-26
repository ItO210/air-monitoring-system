const express = require('express')
const router = express.Router();

const userDataController = require('../controllers/userData.controller.js')

router.get('/', userDataController.getUserData)
router.post('/', userDataController.postUserData)
router.post('/login', userDataController.login)
router.post('/checkUser', userDataController.checkUser)

module.exports = router
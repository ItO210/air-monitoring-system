const express = require('express')
const router = express.Router();

const envDataController = require('../controllers/envData.controller.js')

router.get('/', envDataController.getEnvData)
router.post('/', envDataController.postEnvData)

module.exports = router
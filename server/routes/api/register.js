const express = require('express');
const router = express.Router();

const handleRegisterUser = require('../../controllers/registerController');

router.route('/').post(handleRegisterUser);

module.exports = router;
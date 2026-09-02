const express = require('express');
const router = express.Router();
const { updateUsername, updatePassword } = require('../controllers/settingsController');

router.put('/update-username', updateUsername);
router.put('/update-password', updatePassword);

module.exports = router;
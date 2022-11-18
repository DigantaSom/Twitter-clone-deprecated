const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const auth = require('../../middlewares/auth');

const User = require('../../models/User');
const Tweet = require('../../models/Tweet');

module.exports = router;

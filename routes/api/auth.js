const express = require('express');
const { check, validationResult } = require('express-validator');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const router = express.Router();
const auth = require('../../middlewares/auth');
const User = require('../../models/User');

// @route   GET api/auth
// @desc    Hit this route everytime a component re-renders in the frontend, to make sure that the user is logged in (since JWT is stateless)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Login
// @access  Public
router.post(
  '/',
  [
    check('handle', 'Twitter Handle is required').not().isEmpty(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { handle, password } = req.body;

    try {
      let user = await User.findOne({ handle_lowercase: handle.toLowerCase() });

      if (!user) {
        return res.status(401).json({
          errors: [{ msg: 'Inavlid credentials' }],
        });
      }

      const isMatch = await argon2.verify(user.password, password);

      if (!isMatch) {
        return res.status(401).json({
          errors: [{ msg: 'Invalid credentials' }],
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.status(200).json({ token });
          }
        }
      );
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

const express = require('express');
const { check, validationResult } = require('express-validator');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const router = express.Router();
const User = require('../../models/User');

// @route   GET api/users
// @desc    Fetch all users
// @access  Testing only
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
    check('handle', 'Please enter your Twitter Handle').not().isEmpty(),
    check(
      'password',
      'Please enter a password with 5 or more characters'
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, handle, password, profilePicture } = req.body;
    email = req.body.email.toLowerCase();

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User already exists' }],
        });
      }

      user = new User({
        name,
        email,
        handle,
        handle_lowercase: handle.toLowerCase(),
        password,
        profilePicture: profilePicture || '',
      });
      user.password = await argon2.hash(password);

      await user.save();

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
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

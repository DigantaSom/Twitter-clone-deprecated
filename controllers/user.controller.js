const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// @route GET api/users
// @desc Fetch all users
// @access Testing only
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// @route POST api/users
// @desc Create a user
// @access Public
const createUser = async (req, res) => {
  const { name, handle, password, profilePicture } = req.body;

  if (!name || !req.body.email || !password || !handle) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password.length < 5) {
    return res
      .status(400)
      .json({ message: 'Password must be at least 5 characters long' });
  }

  const email = req.body.email.toLowerCase();

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: 'User already exists',
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
        twitterHandle: user.handle,
        fullName: user.name,
        profilePicture: user.profilePicture,
      },
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(
      {
        user: {
          id: user.id,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    );

    // Creates secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true, // accessible only by a web server
      secure: true, // HTTPS
      sameSite: 'none', // cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: set to match refreshToken's expiration time
    });

    res.status(200).send({ accessToken });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { getAllUsers, createUser };

const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const auth = require('../../middlewares/auth');

const User = require('../../models/User');
const Tweet = require('../../models/Tweet');

// @route   GET api/tweets
// @desc    Fetch all tweets from all users
// @access  For testing only
router.get('/', async (_, res) => {
  try {
    const tweets = await Tweet.find();
    res.status(200).json(tweets);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tweets/:id
// @desc    Fetch a single tweet by its id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).json({ msg: 'Tweet not found.' });
    }
    res.status(200).json(tweet);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Tweet not found.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tweets/user/:userId
// @desc    Fetch all tweets of a user by their userId
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const tweetsByUser = await Tweet.find({ userId: req.params.userId });
    res.status(200).json(tweetsByUser);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Tweet not found.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tweets/tweets-and-replies/:userId
// @desc    Fetch all the tweets where the user has replied, except in their own tweets
// @access  Public
// TODO:

// @route   POST api/tweets
// @desc    Post a tweet
// @access  Private
router.post(
  '/',
  [auth, [check('caption', 'Caption is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newTweet = new Tweet({
        userId: req.user.id,
        fullName: user.name,
        twitterHandle: user.handle,
        profilePicture: user.profilePicture || '', // TODO: make it required
        caption: req.body.caption,
        media: [req.body.imageUri] || [''],
      });
      const tweet = await newTweet.save();
      res.status(200).json(tweet);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/tweets/:id
// @desc    Delete a tweet
// @access  Private (only tweet author)
router.delete('/:id', auth, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      return res.status(404).json({ msg: 'Cannot retrieve tweet.' });
    }

    // if the tweet author is not the one who is trying to delete the tweet
    if (tweet.userId.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'You are not authorized to perform this action.',
      });
    }

    await tweet.delete();

    res.status(200).json({
      msg: 'Tweet deleted',
    });
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Cannot retrieve tweet.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/tweets/like/:tweetId
// @desc    Like or unlike a tweet
// @access  Private
router.put('/like/:tweetId', auth, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.tweetId);

    // if the tweet has already been liked by the same user, then unlike the tweet
    if (tweet.likes.some(like => like.userId.toString() === req.user.id)) {
      tweet.likes = tweet.likes.filter(
        like => like.userId.toString() !== req.user.id
      );
    } else {
      // else, like the tweet
      tweet.likes.unshift({ userId: req.user.id });
    }
    await tweet.save();

    res.status(200).json(tweet.likes);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Tweet not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;

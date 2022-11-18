const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const auth = require('../../middlewares/auth');

const User = require('../../models/User');
const Tweet = require('../../models/Tweet');

// @route   GET api/tweets/replies/:tweetId
// @desc    Fetch all replies and inner_replies of a tweet
// @access  Public
router.get('/:tweetId', async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.tweetId);
    if (!tweet) {
      return res.status(404).json({ msg: 'Cannot retrieve tweet.' });
    }
    res.status(200).json(tweet.replies);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Cannot retrieve tweet.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/tweets/replies/:tweetId
// @desc    Reply to a tweet
// @access  Private
router.put(
  '/:tweetId',
  [auth, [check('text', 'Text is required to reply')]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const tweet = await Tweet.findById(req.params.tweetId);

      if (!tweet) {
        return res.status(404).json({ msg: 'Cannot retrieve Tweet' });
      }

      const user = await User.findById(req.user.id).select('-password');

      const newReply = {
        userId: req.user.id,
        fullName: user.name,
        twitterHandle: user.handle,
        profilePicture: user.profilePicture || '', // TODO: make it required
        text: req.body.text,
        media: req.body.media || [''],
      };
      tweet.replies.unshift(newReply);

      await tweet.save();
      res.status(200).json(tweet.replies);
    } catch (error) {
      console.log(error.message);
      if (error.kind === 'ObjectId') {
        res.status(404).json({ msg: 'Cannot retrieve tweet.' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/tweets/replies/:tweetId/:replyId
// @desc    Delete a particular reply
// @access  Private (Reply owner only)
router.delete('/:tweetId/:replyId', auth, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.tweetId);

    if (!tweet) {
      return res.status(404).json({ msg: 'Cannot retrieve tweet' });
    }

    const reply = tweet.replies.find(
      reply => reply._id.toString() === req.params.replyId
    );

    if (!reply) {
      return res.status(404).json({ msg: 'Cannot retrieve reply' });
    }

    // if the reply author is not the one who is trying to delete the reply
    if (reply.userId.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'You are not authorized to perform this action.',
      });
    }

    tweet.replies = tweet.replies.filter(
      reply => reply.id.toString() !== req.params.replyId
    );
    await tweet.save();

    res.status(200).json(tweet.replies);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Cannot retrieve tweet.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/tweets/replies/like/:tweetId/:replyId
// @desc    Like or unlike a reply
// @access  Private
router.put('/like/:tweetId/:replyId', auth, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.tweetId);

    if (!tweet) {
      return res.status(404).json({ msg: 'Cannot retrieve tweet' });
    }

    const reply = tweet.replies.find(
      reply => reply.id.toString() === req.params.replyId
    );

    if (!reply) {
      return res.status(404).json({ msg: 'Cannot retrieve reply' });
    }

    // if the reply has already been liked by the same user, then unlike the reply
    if (reply.likes.some(like => like.userId.toString() === req.user.id)) {
      reply.likes = reply.likes.filter(
        like => like.userId.toString() !== req.user.id
      );
    } else {
      // else, like the reply
      reply.likes.unshift({ userId: req.user.id });
    }
    await tweet.save();

    res.status(200).json(reply.likes);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Cannot retrieve tweet.' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;

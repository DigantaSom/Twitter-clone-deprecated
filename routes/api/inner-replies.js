const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const auth = require('../../middlewares/auth');

const User = require('../../models/User');
const Tweet = require('../../models/Tweet');

// @route   PUT api/inner-replies/:tweetId/:replyId
// @desc    Post an inner-reply to a reply
// @access  Private
router.put(
  '/:tweetId/:replyId',
  [auth, [check('text', 'Text is required to reply').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const tweet = await Tweet.findById(req.params.tweetId);

      if (!tweet) {
        return res.status(404).json({ msg: 'Cannot retrieve tweet.' });
      }

      const reply = tweet.replies.find(
        reply => reply.id.toString() === req.params.replyId
      );

      if (!reply) {
        return res.status(404).json({ msg: 'Cannot retrieve reply.' });
      }

      const user = await User.findById(req.user.id).select('-password');

      const newInnerReply = {
        userId: req.user.id,
        fullName: user.name,
        twitterHandle: user.handle,
        profilePicture: user.profilePicture || '', // TODO: make it required
        text: req.body.text,
        media: req.body.media || [''],
      };
      reply.inner_replies.push(newInnerReply);

      await tweet.save();
      res.status(200).send(tweet.replies);
    } catch (error) {
      console.log(error.message);
      if (error.kind === 'ObjectId') {
        res.status(404).json({ msg: 'Cannot retrieve tweet.' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/inner-replies/:tweetId/:replyId/:innerReplyId
// @desc    Delete a particular inner-reply
// @access  Private (inner-reply owner only)
router.delete('/:tweetId/:replyId/:innerReplyId', auth, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.tweetId);
    if (!tweet) {
      return res.status(404).json({ msg: 'Cannot retrieve tweet.' });
    }

    const reply = tweet.replies.find(
      reply => reply.id.toString() === req.params.replyId
    );
    if (!reply) {
      return res.status(404).json({ msg: 'Cannot retrieve reply.' });
    }

    const innerReply = reply.inner_replies.find(
      innerReply => innerReply.id.toString() === req.params.innerReplyId
    );
    if (!innerReply) {
      return res.status(404).json({ msg: 'Cannot retrieve reply.' });
    }

    // if the inner-reply author is not the one who is trying to delete the it
    if (innerReply.userId.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'You are not authorized to perform this action.',
      });
    }
    // else, delete it
    reply.inner_replies = reply.inner_replies.filter(
      innerReply => innerReply.id.toString() !== req.params.innerReplyId
    );

    await tweet.save();
    res.status(200).json(reply.inner_replies);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Cannot retrieve tweet.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/inner-replies/:tweetId/:replyId/:innerReplyId
// @desc    Like or unlike a particular inner-reply
// @access  Private
router.put('/:tweetId/:replyId/:innerReplyId', auth, async (req, res) => {
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

    const innerReply = reply.inner_replies.find(
      innerReply => innerReply.id.toString() === req.params.innerReplyId
    );
    if (!innerReply) {
      return res.status(404).json({ msg: 'Cannot retrieve reply.' });
    }

    // if the inner-reply has already been liked by the same user, then unlike it
    if (
      innerReply.likes.some(
        innerReply => innerReply.userId.toString() === req.user.id
      )
    ) {
      innerReply.likes = innerReply.likes.filter(
        like => like.userId.toString() !== req.user.id
      );
    } else {
      // else, like it
      innerReply.likes.unshift({ userId: req.user.id });
    }

    await tweet.save();
    res.status(200).json(innerReply.likes);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Cannot retrieve tweet.' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;

const jwt = require('jsonwebtoken');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = (req, res, next) => {
  // get the token from header
  const token = req.header('Authorization')?.split(' ')[1].trim();

  if (!token) {
    return res.status(401).json({
      msg: 'No token, authorization denied.',
    });
  }

  // Verify token
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Invalid token.' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token.' });
  }
};

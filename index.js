require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const corsOptions = require('./config/corsOptions');

const app = express();

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/user.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/tweets', require('./routes/tweet.routes'));
app.use('/api/tweets/replies', require('./routes/reply.routes'));
app.use('/api/inner-replies', require('./routes/inner-reply.routes'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);

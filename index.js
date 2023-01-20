const express = require('express');

const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/tweets', require('./routes/api/tweets'));
app.use('/api/tweets/replies', require('./routes/api/replies'));
app.use('/api/inner-replies', require('./routes/api/inner-replies'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);

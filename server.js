const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// DB connection
mongoose
	.connect(keys.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(console.log('Mongo connected'))
	.catch(err => console.error(err));

// Services
const app = express();

// Routes
app.get('/', (req, res) => res.send('API running good...'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

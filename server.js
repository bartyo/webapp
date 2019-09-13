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
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/patients', require('./routes/api/patients'));
app.use('/api/relays', require('./routes/api/relays'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

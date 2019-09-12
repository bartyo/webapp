const express = require('express');

// Services
const app = express();

// Routes
app.get('/', (req, res) => res.send('API running good...'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

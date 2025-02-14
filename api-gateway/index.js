const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Use API Routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));

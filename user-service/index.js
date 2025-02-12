const express = require('express');
const authRoutes = require('./auth');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));

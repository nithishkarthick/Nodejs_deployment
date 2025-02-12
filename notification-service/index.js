const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 6000;

app.use(bodyParser.json());

// Mock Email Service
app.post('/send-email', (req, res) => {
    const { email, message } = req.body;
    console.log(`Email sent to ${email}: ${message}`);
    res.send('Email sent successfully!');
});

// Mock SMS Service
app.post('/send-sms', (req, res) => {
    const { phone, message } = req.body;
    console.log(`SMS sent to ${phone}: ${message}`);
    res.send('SMS sent successfully!');
});

app.listen(port, () => console.log(`Notification Service running on port ${port}`));

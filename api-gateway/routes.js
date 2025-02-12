const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const authenticateToken = require('./middleware/authMiddleware');

const router = express.Router();

// User Service (Auth routes do not need token verification)
router.use('/auth', createProxyMiddleware({ target: 'http://user-service:5002', changeOrigin: true }));
router.use('/users', authenticateToken, createProxyMiddleware({ target: 'http://user-service:4001', changeOrigin: true }));

// Donor Service
router.use('/donors', authenticateToken, createProxyMiddleware({ target: 'http://donor-service:5001', changeOrigin: true }));

// Notification Service (Example)
router.use('/notifications', authenticateToken, createProxyMiddleware({ target: 'http://notification-service:6000', changeOrigin: true }));

module.exports = router;

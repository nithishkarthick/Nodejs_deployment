module.exports = {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    services: [
      {
        name: 'user-service',
        url: 'http://user-service:4000',
        path: '/users',
      },
      {
        name: 'donation-service',
        url: 'http://donation-service:5000',
        path: '/donations',
      },
      {
        name: 'blood-service',
        url: 'http://blood-service:6000',
        path: '/blood',
      },
    ],
    logging: {
      level: 'debug',
    },
    apiKey: 'YOUR_API_KEY_HERE', // You can leave this as a placeholder or remove it for now
  };
  
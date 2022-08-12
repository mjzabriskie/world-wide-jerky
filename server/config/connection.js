const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/world-wide-jerky', {
});

module.exports = mongoose.connection;

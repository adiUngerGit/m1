const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect('mongodb://127.0.0.1/shopweb2');
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to DB!');
    });
}

module.exports = connectDB;
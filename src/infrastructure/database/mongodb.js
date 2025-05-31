const mongoose = require('mongoose');

const connectDb = async function() {
    try {
        let MONGODB_URI = process.env.MONGODB_URI;
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err}`);
    }
};

module.exports = connectDb;
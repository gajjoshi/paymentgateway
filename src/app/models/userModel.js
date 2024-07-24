const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    amount: String,
    paymentScreenshot: Buffer // Store image as binary data
});

module.exports = mongoose.model('user', userSchema);

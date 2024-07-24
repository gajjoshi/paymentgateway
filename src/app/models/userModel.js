const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    amount: String,
    updateStatus: String,
    paymentScreenshot: Buffer, // Store image as binary data
    status: { type: Number, default: 0 } // Add status field with default value 0
});

module.exports = mongoose.model('user', userSchema);

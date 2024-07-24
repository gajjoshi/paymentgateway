const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Prime:prime@cluster0.mtl5kau.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const User = require('./models/userModel');

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Update this to match your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 204
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('paymentScreenshot'), async (req, res) => {
    try {
        const { username, email, amount } = req.body;
        const paymentScreenshot = req.file ? req.file.buffer : null;

        await User.create({
            name: username,
            email: email,
            amount: amount,
            updateStatus:'pending',
            paymentScreenshot: paymentScreenshot
        });

        res.status(200).send('User created successfully with screenshot');
    } catch (error) {
        res.status(500).send('Error creating user: ' + error.message);
    }
});

http.listen(5000, function () {
    console.log('Backend server started on port 5000');
});

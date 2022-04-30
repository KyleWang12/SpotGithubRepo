const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const entryRoute = require('./routes/entry');
const reviewRoute = require('./routes/review');
const userRoute = require('./routes/user');

// const mongooseEnpoint = 'mongodb+srv://wyh:00OKXKABa0SKteLJ@githubrepo.xkhz8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongooseEnpoint = process.env.MONGODB_URL || 'mongodb://192.168.1.9/review_app';
mongoose.connect(mongooseEnpoint, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: '*',
}));

app.use('/api/entry', entryRoute);
app.use('/api/review', reviewRoute);
app.use('/api/user', userRoute);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(process.env.PORT || 8000, () => {
    console.log('Starting server');
});
// Dependencies

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const goalsRouter = require('./controllers/goals')

const app = express();
// configre settings
require('dotenv').config();

const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;
const db = mongoose.connection;

// Connect to Mongo DB

mongoose.connect(DATABASE_URI);

//add mongoDB
db.on('connected', () => console.log(' Connected to Mongo DB'));
db.on('error', (err) => console.log('Mongo ERROR: ' + err.message));

// body parser middleware 

app.use(express.urlencoded({ extented: false}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => res.redirect('/goals'));

app.use('/goals', goalsRouter);


app.listen(PORT, () => {
    console.log(`Express is listening on port${PORT}`);
});
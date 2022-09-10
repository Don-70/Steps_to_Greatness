// Dependencies

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const goalsRouter = require('./controllers/goals')
const goals2Router = require('./controllers/goals2')
const goals3Router = require('./controllers/goals3')

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
app.use(express.static('public'));


// homepage route
app.get('/', (req, res) => {
    res.render('index.ejs');
});


app.use('/goals', goalsRouter);
app.use('/goals2', goals2Router);
app.use('/goals3', goals3Router);



app.listen(PORT, () => {
    console.log(`Express is listening on port${PORT}`);
});
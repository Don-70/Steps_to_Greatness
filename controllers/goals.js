// Dependencies 

const express = require('express');
const router = express.Router();
const Goal = require('../models/book');

// Seed Route 

router.get ('/seed', (req, res) => {
    const data = require('../data.json');
    Goal.deleteMany({}, (err,result ) => {
        Goal.insertMany(data, (err, result) =>{

        });
    });
});



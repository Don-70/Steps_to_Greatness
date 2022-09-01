// Dependencies 

const express = require('express');
const router = express.Router();
const Goal = require('../models/goal');

// Seed Route 

router.get ('/seed', (req, res) => {
    const data = require('../data.json');
    Goal.deleteMany({}, (err,result ) => {
        Goal.insertMany(data, (err, result) =>{
            res.redirect('/goals');
        });
    });
});

// Index

router.get ('/', (req, res) => {
    Goal.find({}, (err, goals) => {
        res.render('index.ejs', {
            'goals' : goals
        });
    });
});

module.exports = router
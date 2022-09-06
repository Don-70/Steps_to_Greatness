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
        res.render('goals/index.ejs', {
            'goals' : goals
        });
    });
});

//New 

router.get('/new', (req, res) => {
    res.render('goals/new.ejs');
});


//Delete

router.delete('/:id', (req, res) => {
    Goal.findByIdAndDelete(req.params.id, (err, deletedGoal) => {
        console.log('deletedBook: ', deletedGoal);
        res.redirect('/goals');
    });
});

//Update
router.put('/:id', (req, res) => {
    req.body.completed = !!req.body.completed;

    Goal.findByIdAndUpdate(req.params.id, req.body, (err, oldGoalVersion) => {
        res.redirect('/goals/' + req.params.id);
    });
});

//Create
router.post('/', (req, res) => {
    req.body.completed = !!req.body.completed;

    Goal.create(req.body, (err, createdGoal) => {
        res.redirect('/goals');
    });
});

// Edit

router.get('/:id/edit', (req, res) => {
    Goal.findById(req.params.id, (err, foundGoal) =>{
        res.render('goals/edit.ejs', {
            goal: foundGoal
        });
    });
});

//Show
router.get("/:id", (req, res) => {
    Goal.findById(req.params.id, (err, foundGoal) => {
        res.render('goals/show.ejs', { goal: foundGoal })
    });
});


module.exports = router;
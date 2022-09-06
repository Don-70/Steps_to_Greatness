const express = require('express');
const router = express.Router();
const Goal2 = require('../models/goal2');

// Seed Route 

router.get ('/seed', (req, res) => {
    const data = require('../data.json');
    Goal2.deleteMany({}, (err,result ) => {
        Goal2.insertMany(data, (err, result) =>{
            res.redirect('/goals2');
        });
    });
});

// Index

router.get ('/', (req, res) => {
    Goal2.find({}, (err, goals2) => {
        res.render('goals2/index.ejs', {
            'goals2' : goals2
        });
    });
});

//New 

router.get('/new', (req, res) => {
    res.render('goals2/new.ejs');
});


//Delete

router.delete('/:id', (req, res) => {
    Goal2.findByIdAndDelete(req.params.id, (err, deletedGoal2) => {
        console.log('deletedBook: ', deletedGoal2);
        res.redirect('/goals2');
    });
});

//Update
router.put('/:id', (req, res) => {
    req.body.completed = !!req.body.completed;

    Goal2.findByIdAndUpdate(req.params.id, req.body, (err, oldGoal2Version) => {
        res.redirect('/goals2/' + req.params.id);
    });
});

//Create
router.post('/', (req, res) => {
    req.body.completed = !!req.body.completed;

    Goal2.create(req.body, (err, createdGoal) => {
        res.redirect('/goals2');
    });
});

// Edit

router.get('/:id/edit', (req, res) => {
    Goal2.findById(req.params.id, (err, foundGoal2) =>{
        res.render('goals2/edit.ejs', {
            goal2: foundGoal2
        });
    });
});

//Show
router.get("/:id", (req, res) => {
    Goal2.findById(req.params.id, (err, foundGoal2) => {
        res.render('goals2/show.ejs', { goal2: foundGoal2 })
    });
});


module.exports = router;
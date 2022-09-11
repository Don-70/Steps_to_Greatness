const express = require('express');
const router = express.Router();
const Goal3 = require('../models/goal3');

// Seed Route 

router.get ('/seed', (req, res) => {
    const data = require('../data.json');
    Goal3.deleteMany({}, (err,result ) => {
        Goal3.insertMany(data, (err, result) =>{
            res.redirect('/goals3');
        });
    });
});

// Index

router.get ('/', (req, res) => {
    Goal3.find({}, (err, goals3) => {
        res.render('goals3/index.ejs', {
            'goals3' : goals3
        });
    });
});

//New 

router.get('/new', (req, res) => {
    res.render('goals3/new.ejs');
});


//Delete

router.delete('/:id', (req, res) => {
    Goal3.findByIdAndDelete(req.params.id, (err, deletedGoal3) => {
        console.log('deletedBook: ', deletedGoal3);
        res.redirect('/goals3');
    });
});

//Update
router.put('/:id', (req, res) => {
    req.body.completed = !!req.body.completed;

    Goal3.findByIdAndUpdate(req.params.id, req.body, (err, oldGoal3Version) => {
        res.redirect('/goals3/' + req.params.id);
    });
});

//Create
router.post('/', (req, res) => {
    req.body.completed = !!req.body.completed;

    Goal3.create(req.body, (err, createdGoal) => {
        res.redirect('/goals3');
    });
});

// Edit

router.get('/:id/edit', (req, res) => {
    Goal3.findById(req.params.id, (err, foundGoal3) =>{
        res.render('goals3/edit.ejs', {
            goal3: foundGoal3
        });
    });
});

//Show
router.get("/:id", (req, res) => {
    Goal3.findById(req.params.id, (err, foundGoal3) => {
        res.render('goals3/show.ejs', { goal3: foundGoal3 })
    });
});




module.exports = router;
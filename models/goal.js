const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new mongoose.Schema({
    title: { type: String, require: true},
    Step1: { type: String , require: true},
    Step2: { type: String , require: true},
    Step3: { type: String , require: true},
    completed: Boolean,
}, { timestamps: true});


module.exports = mongoose.model('goal',goalSchema);
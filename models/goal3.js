const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goal3Schema = new mongoose.Schema({
    title: { type: String, require: true},
    Step1: { type: String , require: true},
    Step2: { type: String , require: true},
    Step3: { type: String , require: true},
}, { timestamps: true});


module.exports = mongoose.model('goal3',goal3Schema);
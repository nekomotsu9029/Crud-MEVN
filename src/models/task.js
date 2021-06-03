const mongoose = require('mongoose');
const {Schema} = mongoose;

const task = new Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('task', task);
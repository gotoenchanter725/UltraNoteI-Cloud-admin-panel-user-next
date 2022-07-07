const mongoose = require('mongoose');
const user = require('./user');

const userActivitySchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: user, required: true},
    action: {type: String},
    source: {type: String},
    ip: {type: String},
    location: {type: String},
    date: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('UserActivity', userActivitySchema);

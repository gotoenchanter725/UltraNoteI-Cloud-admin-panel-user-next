const mongoose = require('mongoose');
const User = require('./user');

const MessagesSchema = mongoose.Schema({
    senderID: {type: mongoose.Schema.Types.ObjectId, ref: User},
    senderAdress: {type: String, required: true},
    recipientAdress:  {type: String, required: true},
    amount: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
    status: {type: String, default: 'pending'},
    note: {type: String},
    hash: {type: String, required: true},
    anonymity: {type: Number, required: true},
    message: {type: String},
    blockHeight: {type: Number}
});

module.exports = mongoose.model('Messages', MessagesSchema);
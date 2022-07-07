const mongoose = require('mongoose');
const User = require('./user');

const TransactionsSchema = mongoose.Schema({
    senderID: {type: mongoose.Schema.Types.ObjectId, ref: User},
    senderAdress: {type: String, required: true},
    recipientAdress:  {type: String, required: true},
    amount: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
    status: {type: String, default: 'pending'},
    note: {type: String, required: true},
    hash: {type: String, required: true}
});

module.exports = mongoose.model('Transactions', TransactionsSchema);
const mongoose = require('mongoose');
const user = require('./user');

const WalletSchema = mongoose.Schema({
    walletHolder: {type: mongoose.Schema.Types.ObjectId, ref: user, required: true },
    name: {type: String, required: true},
    address: {type: String},
    balance: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Wallet', WalletSchema);
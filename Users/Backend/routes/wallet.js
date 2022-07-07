const express = require('express');
const router = express.Router();
const walletCtr = require('../controllers/wallet');

router
    .post('/', walletCtr.createNewWallet)
    .post('/update_wallet', walletCtr.UpdateWallet)
    .get('/transactions/:address', walletCtr.getTransactions)
    .post('/transactions', walletCtr.sendTransaction)
    .get('/keys/:address', walletCtr.getSpendKeys)
    .get('/status', walletCtr.getWalletStatus)
    .get('/balance/:address', walletCtr.getBalance)
    .post('/my-wallet', walletCtr.getAllWallets)
    .post('/messages', walletCtr.getAllMessages)
    .post('/attachment', walletCtr.downloadAttachment)
    .post('/sendmsg', walletCtr.sendMsg)
    .put('/optimize', walletCtr.optimizeWallet)


module.exports = router;
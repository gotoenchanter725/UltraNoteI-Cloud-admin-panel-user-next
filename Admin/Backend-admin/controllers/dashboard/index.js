const { Types } = require('mongoose');
const { ObjectId } = Types;
const Wallet = require('../../models/wallet');
const User = require('../../models/user');
const Transaction = require('../../models/transactions');

module.exports = async (req, res) => {
  try {
    const totalUser = await User.count();
    const deletedUser = await User.count({ deleted: true });
    const activeUser = await User.count({ isActive: true });
    const companyProfit = 894548;
    res.status(200).json({ totalUser, deletedUser, activeUser, companyProfit });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: 'ERROR WHILE GETTING WALLETS', err });
  }
};

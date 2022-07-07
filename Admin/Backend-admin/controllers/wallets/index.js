const XUNI = require("ultranotei-api");
const { Types } = require("mongoose");
const { ObjectId } = Types;
const Wallet = require("../../models/wallet");
const Settings = require("../../models/settings");

const DB_RPCSETTINGS_STR = 'RPCSettings';
var xuni;
reconnectXUNI();

function reconnectXUNI() {
  loadRPCSettings({}).then(settings=>{
  xuni = new XUNI({
    daemonHost: settings.rpcHost || process.env.XUNI_HOST || "http://127.0.0.1", 
    walletHost: settings.rpcHost || process.env.XUNI_HOST || "http://127.0.0.1", 
    daemonRpcPort: settings.daemonRpcPort || process.env.DAEMONRPC_PORT || "43000",
    walletRpcPort: settings.walletRpcPort || process.env.XUNI_PORT || "8070",
    rpcUser: settings.rpcUser || process.env.RPC_USER,
    rpcPassword: settings.rpcPassword || process.env.RPC_PASSWORD
    });
  })
}

const uniqid = require("uniqid");

module.exports = {
  async walletList(req, res) {
    await Wallet.find()
      .then((wallets) => {
        if (!wallets) {
          return res.status(400).json({ message: "wallets not found" });
        }
        return res.status(200).json({ wallets });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(400)
          .json({ message: "ERROR WHILE GETTING WALLETS", err });
      });
  },
  async getTransactions(req, res) {
    const walletAddress = req.params.address;

    const opts = {
      firstBlockIndex: 203000,
      blockCount: 5000000,
      addresses: [walletAddress],
    };

    const data = await xuni.getTransactions(opts);
    const totalTransactions = [];

    for (let i = 0; i < data.items.length; i++) {
      const item = data.items[i];
      for (let j = 0; j < item.transactions.length; j++) {
        const transaction = item.transactions[j];
        var message = [];
        try {
          const transaction_message = await xuni.getTransaction(
            transaction.transactionHash
          );
          var message_list = transaction_message.split('"message":"');
          for (let k = 0; k < message_list.length; k++) {
            var msg_list = message_list[k].split('","type"');
            if (k > 0 && msg_list.length > 0 && msg_list[0].length > 0) {
              message.push(msg_list[0]);
            }
          }
          transaction.message = message;
        } catch (ex) {
          console.log(ex);
        }

        const recipientAddress = transaction.transfers[0].address;
        var senderAddress = transaction.transfers[1].address;
        if (senderAddress == "") {
          senderAddress = uniqid();
        }

        let transactionObj = {
          senderAdress: senderAddress,
          recipientAdress: recipientAddress,
          updatedAt: new Date(transaction.timestamp * 1000).toISOString(),
          amount: Math.abs(transaction.transfers[0].amount),
          note: "",
          hash: transaction.transactionHash,
        };
        totalTransactions.push(transactionObj);
      }
    }

    const transactions = totalTransactions;
    const deposit = [];
    const withdraw = [];
    if (transactions && transactions.length) {
      transactions.forEach((transaction) => {
        if (transaction.senderAdress === walletAddress)
          withdraw.push(transaction);

        if (transaction.recipientAdress === walletAddress)
          deposit.push(transaction);
      });
    }
    res.status(200).json({ deposit, withdraw });
  },
  async getWalletStatus(req, res) {
    try {
      const status = await xuni.status();
      res.status(200).json(status);
    } catch (error) {
      console.log(error);
    }
  },

  async walletsdepositscheck(req, res) {
    try {
      const senderAddress = req.body.sender;
      const recipientAddress = req.body.recipient;
      const amount = req.body.amount;
      const fee = 100000;
      const anonymity = 2;
      const transactionOptions = {
        addresses: [senderAddress],
        anonymity: anonymity,
        fee: fee,
        transfers: [
          {
            amount: amount,
            address: recipientAddress,
          },
        ],
        unlockTime: 0,
        changeAddress: senderAddress,
      };
      const Transaction = await xuni.sendTransaction(transactionOptions);
    } catch (error) {
      console.log(error);
    }
  },
  async getBalance(req, res) {
    try{
    if(!req.params.address) throw(new Error('Address parameter missing'));
    let balance = await xuni.getBalance(req.params.address);
    
    return res.status(200).json({ ...balance });
    }
    catch(err){
      console.log('wallets/getBalance.catch:', err);
    return res
      .status(400)
      .json({ message: "Error while getting balance:", err });
    }
  },
 async getWalletData(req, res) {
  try{
    if(!req.params.id) throw(new Error('User id missing'));
    let wallets = await Wallet.find({walletHolder: req.params.id});
    if (!wallets || !wallets.length) {
      return res.status(400).json({ message: "wallets not found" });
    }
    let walletAddress = wallets[0].address;
    let balance = await xuni.getBalance(walletAddress);
    let wallet = { address: walletAddress, balance: balance };
    return res.status(200).json(wallet);
  }
  catch(err) {
    console.log('wallets/getWalletData.catch:', err);
    return res
      .status(400)
      .json({ message: "ERROR WHILE GETTING WALLET DATA:", err });
  };
 },
 async getRPCSettings(req, res) {
  let settingsObj = {
    rpcHost: '',
    rpcUser: '',
    rpcPassword: ''
  };
  try {
    settingsObj = await loadRPCSettings(settingsObj);
    res.status(200).json(settingsObj);

  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Error occurred:'+error});
  }
},

 async setRPCSettings(req, res) {
  try {
    for(let skey in req.body.rpcSettings)
    {
      await Settings.updateOne({type: DB_RPCSETTINGS_STR, key: skey}, {key: skey, value: req.body.rpcSettings[skey]}, {upsert: true});
    }
    res.status(200).json({message:'OK'});
   reconnectXUNI();
   
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Errror:'+error});
  }
 }
};

async function loadRPCSettings(settings) {
  let settingsRead = await Settings.find({type: DB_RPCSETTINGS_STR});
  for(let s of settingsRead) settings[s.key] = s.value;
  return settings;
}
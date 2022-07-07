const XUNI = require("ultranotei-api");
const Wallets = require("../../models/wallet");
const Transactions = require("../../models/transactions");
const Messages = require("../../models/messages");
const Wallet = require("../../models/wallet");
const { compareSync } = require("bcrypt");
const User = require("../../models/user");
const UserActivity = require("../../models/user_activity");
const user_data = require("../user/user_data");
const { baseModelName } = require("../../models/user");
const xuni = new XUNI({
  daemonHost: process.env.XUNI_HOST,
  walletHost: process.env.XUNI_HOST,
  daemonRpcPort: process.env.DAEMONRPC_PORT,
  walletRpcPort: process.env.XUNI_PORT,
  rpcUser: process.env.RPC_USER,
  rpcPassword: process.env.RPC_PASSWORD,
});
const requestIp = require("request-ip");
const geoip = require("geoip-lite");
const formidable = require("formidable");
const uniqid = require("uniqid");
const stream = require("stream");
const http = require("http");
const AdmZip = require("adm-zip");
const FormData = require("form-data");
const axios = require("axios");
const url = require("url");
const Chacha8 = require("../../helpers/chacha8");
const UltraNote = require("../../helpers/ultranote");
const ultranote = new UltraNote(
  process.env.XUNI_HOST,
  process.env.XUNI_PORT,
  process.env.DAEMONRPC_PORT,
  5000,
  process.env.RPC_USER,
  process.env.RPC_PASSWORD
);

var fs = require("fs");

module.exports = {
  async getWalletStatus(req, res) {
    try {
      const status = await xuni.status();

      res.status(200).json(status);
    } catch (error) {
      console.log("*".repeat(50), "Error: ", error);
    }
  },

  async getAllWallets(req, res) {
    const userId = req.body.id;
    let unconfirmedBalance = 0;
    let availableBalance = 0;
    let usdAvailabeBalance = 0;
    let usdUnconfirmedBalance = 0;
    let walletsList = [];
    try {
      const wallets = await Wallets.find({ walletHolder: userId });
      for (let i = 0; i < wallets.length; i++) {
        const wallet = wallets[i];
        walletsList.push(wallet.address);
        let balance = 0;
        try {
          balance = await xuni.getBalance(wallet.address.trim());
        } catch (ex) {
          console.log("balance:\r\n" + ex);
          fs.writeFile("balance-error.txt", ex, function (err) {
            if (err) return console.log(err);
          });
        }
        await Wallets.updateOne(
          { _id: wallet._id },
          {
            $set: {
              balance: balance.availableBalance / 1000000,
            },
          }
        );
        availableBalance = balance.availableBalance / 1000000;
        unconfirmedBalance = balance.lockedAmount / 1000000;
      }
    } catch (ex) {
      console.log(ex);
    }

    let data;
    const user = await User.findOne({ _id: userId });
    try {
      if (user.currency == "usd") {
        await axios
          .get(
            `https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&ids=XUNI`
          )
          .then((res) => (data = res.data[0]));
        usdAvailabeBalance = availableBalance * data.price;
        usdUnconfirmedBalance = unconfirmedBalance * data.price;
      }
      if (user.currency == "btc") {
        await axios
          .get(
            `https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&ids=XUNI&convert=BTC`
          )
          .then((res) => (data = res.data[0]));
        usdAvailabeBalance = availableBalance * data.price;
        usdUnconfirmedBalance = unconfirmedBalance * data.price;
      }
    } catch {
      usdAvailabeBalance = 0;
      usdUnconfirmedBalance = 0;
    }

    try {
      const wallets = await Wallets.find({ walletHolder: userId });
      const newWallets = [];
      for (let i = 0; i < wallets.length; i++) {
        const wallet = wallets[i];
        let keys;
        let key1, key2;
        try {
          key1 = await xuni.getSpendKeys(wallet.address.trim());
          key2 = await xuni.getViewSecretKey(wallet.address.trim());
        } catch (ex) {
          console.log(ex);
          keys = {};
        }
        wallet.spendKey = key1["privateSpendKey"];
        wallet.viewKey = key2["privateViewKey"];

        newWallet = {
          address: wallet.address,
          balance: wallet.balance,
          createdAt: wallet.createdAt,
          name: wallet.name,
          updatedAt: wallet.updatedAt,
          walletHolder: wallet.walletHolder,
          _id: wallet._id,
          id: wallet._id,
          spendKey: key1["privateSpendKey"],
          viewKey: key2["privateViewKey"],
        };
        newWallets.push(newWallet);
      }

      if (wallets) {
        res
          .status(200)
          .json([
            newWallets,
            unconfirmedBalance,
            usdAvailabeBalance,
            usdUnconfirmedBalance,
          ]);
      } else {
        res.status(404);
      }
    } catch (error) {
      console.log("*".repeat(50), "Error: ", error);
      res.status(500).json(error);
    }
  },

  async createNewWallet(req, res) {
    try {
      const resRPC = await xuni.createAddress();
      const newAddress = resRPC.address;
      const user_id = req.body.id;
      const name = req.body.name;
      const ip = requestIp.getClientIp(req);
      const geo = geoip.lookup(ip) || { city: "", country: "" };

      const newWallet = {
        walletHolder: user_id,
        address: newAddress,
        name,
      };
      try {
        let wallet = await Wallets.create(newWallet);

        await User.updateOne(
          { _id: user_id },
          {
            $set: {
              isWalletCreated: true,
            },
          }
        );

        let user = await User.findOne({ _id: user_id });

        const userData = user_data(user);

        const newUserActivity = {
          userId: user_id,
          action: "Create Wallet",
          source: "Web",
          ip: ip,
          location: geo.city + " " + geo.country,
          date: Date.now(),
        };

        await UserActivity.create(newUserActivity);

        res
          .status(200)
          .json({
            message: "wallet Created successfully",
            data: [wallet, userData],
          });
      } catch (err) {
        console.log(err);
        res
          .status(400)
          .json({ message: "ERROR WHILE CREATING A NEW WALLET", err });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "ERROR OUCURED" });
    }
  },
  async UpdateWallet(req, res) {
    try {
      const resRPC = await xuni.createAddress();
      const newAddress = resRPC.address;
      const id = req.body.id;
      const userId = req.body.user_id;
      const ip = requestIp.getClientIp(req);
      const geo = geoip.lookup(ip) || { city: "", country: "" };

      const updateWallet = {
        address: newAddress,
        updatedAt: Date.now(),
      };
      Wallet.updateOne({ _id: id }, { $set: updateWallet })
        .then(async (wallet) => {
          wallet = await Wallets.find({ _id: id });
          res
            .status(200)
            .json({ message: "wallet Updated successfully", wallet });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(400)
            .json({ message: "ERROR WHILE GENERATING A NEW ADDRESS", err });
        });

      const newUserActivity = {
        userId: userId,
        action: "Generate New Address",
        source: "Web",
        ip: ip,
        location: geo.city + " " + geo.country,
        date: Date.now(),
      };

      await UserActivity.create(newUserActivity);
    } catch (ex) {
      console.log(ex);
      res.status(400).json({ message: "ERROR OUCURED" });
    }
  },
  async sendTransaction(req, res) {
    try {
      const senderId = req.body.id;
      const senderAddress = req.body.sender.trim();
      const recipientAddress = req.body.recipient.trim();
      const note = req.body.note.trim();
      const amount = +req.body.amount;
      const paymentId = req.body.paymentId;
      const fee = 100000;
      const anonymity = 2;
      const ip = requestIp.getClientIp(req);
      const geo = geoip.lookup(ip) || { city: "", country: "" };
      fs.writeFile(
        "sending-log.txt",
        senderAddress +
          "," +
          recipientAddress +
          "," +
          paymentId +
          ", " +
          amount,
        function (err) {
          if (err) return console.log(err);
          console.log("Hello World > helloworld.txt");
        }
      );
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

      if (paymentId) transactionOptions.paymentId = paymentId;

      if (senderAddress === recipientAddress)
        throw new Error("Sender and receiver cannot be same.");

      console.log("Transaction Sending:", transactionOptions);

      xuni
        .sendTransaction(transactionOptions)
        .then(({ transactionHash }) => {
          const newTransaction = {
            senderID: senderId,
            senderAdress: senderAddress,
            recipientAdress: recipientAddress,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            amount: amount,
            note: note,
            hash: transactionHash,
          };
          Transactions.create(newTransaction)
            .then(() => {
              res
                .status(200)
                .json({ message: "New transaction sent", newTransaction });
            })
            .catch((err) => {
              res
                .status(400)
                .json({
                  message: "ERROR WHILE SAVING THE TRANSACTION IN THE DATABASE",
                  err,
                });
            });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(400)
            .json({ message: "ERROR WHILE SENDING THE TRANSACTION" });
        });

      const newUserActivity = {
        userId: senderId,
        action: "Withdraw Transaction",
        source: "Web",
        ip: ip,
        location: geo.city + " " + geo.country,
        date: Date.now(),
      };

      await UserActivity.create(newUserActivity);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getSpendKeys(req, res) {
    try {
      const { address } = req.params;

      const spendKeys = await xuni.getSpendKeys(address);

      res.status(200).json(spendKeys);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async sendMsg(req, res) {
    async function sendMessage(fields, hash, encryptionKey, res) {
      const {
        addresses,
        replyTo,
        selfDestructTime,
        destructTime,
        message,
        amount,
        anonymity,
      } = fields;
      const userId = fields.id;

      try {
        const addr_list = JSON.parse(addresses);
        const wallets = await Wallets.find({ walletHolder: userId });
        for (let i = 0; i < wallets.length; i++) {
          const wallet = wallets[i];
          const senderAddress = wallet.address.trim();
          for (var j = 0; j < addr_list.length; j++) {
            const recipientAddress = addr_list[j];
            let msg_body = "";
            if (replyTo == "true") {
              msg_body = msg_body + "Reply-To: " + senderAddress + "\n";
            }
            if (hash.length > 0 && encryptionKey.length > 0) {
              msg_body = msg_body + "Attachment: " + hash + "\n";
              msg_body =
                msg_body + "Attachment-Encryption-Key: " + encryptionKey + "\n";
            }
            msg_body = msg_body + "\n";
            msg_body = msg_body + message;
            msg_body = msg_body.replace(/\"/g, "'");
            let fee = parseInt(amount);

            const transactionOptions = {
              addresses: [senderAddress],
              anonymity: anonymity,
              fee: 0,
              transfers: [
                {
                  amount: fee,
                  address:
                    "XuniihAQHBshnuZkMh2Rz6N6BtvZnfRWqGuUdZrbwfYxSqqbqoNVF9VW37MEW14qeqMqwBoBKxmoc1KtwXdZohjhC63hUoZVLos",
                  message: `Fee for sending message, From: ${senderAddress} To: ${recipientAddress}`,
                },
              ],
              unlockTime: 0,
              changeAddress: senderAddress,
            };
            ultranote
              .sendTransaction(transactionOptions)
              .then(() => {
                ultranote
                  .sendTransaction({
                    addresses: [senderAddress],
                    anonymity: anonymity,
                    fee: 0,
                    transfers: [
                      {
                        amount: 1000,
                        address: recipientAddress,
                        message: msg_body,
                      },
                    ],
                    unlockTime: 0,
                    changeAddress: senderAddress,
                  })
                  .then(({ transactionHash }) => {
                    const newMessage = {
                      senderID: userId,
                      senderAdress: senderAddress,
                      recipientAdress: recipientAddress,
                      createdAt: Date.now(),
                      updatedAt: Date.now(),
                      amount: amount,
                      note: "",
                      hash: transactionHash,
                      anonymity: anonymity,
                      message: msg_body,
                      blockHeight: 0,
                    };
                    console.log("OK");
                    Messages.create(newMessage).catch((err) => {
                      console.log(err);
                      return res
                        .status(400)
                        .json({
                          message:
                            "ERROR WHILE SAVING THE TRANSACTION IN THE DATABASE",
                          err,
                        });
                    });
                  });
              })
              .catch((err) => {
                console.log(err);
                return res
                  .status(400)
                  .json({ message: "ERROR WHILE SENDING THE MESSAGE" });
              });
          }
        }
      } catch (err) {
        console.log(err);
        return res
          .status(400)
          .json({ message: "ERROR WHILE SENDING THE MESSAGE" });
      }
      res.status(200).json({ message: "New message sent" });
    }

    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error", err);
        throw err;
      }

      if (files && files.files) {
        var zip = new AdmZip();

        if (files.files.length == undefined) {
          zip.addLocalFile(files.files.path, "", files.files.name);
        } else {
          for (file of files.files) {
            zip.addLocalFile(file.path, "", file.name);
          }
        }
        const zipBuffer = zip.toBuffer();
        let key = require("crypto").randomBytes(32);
        var encryptionKey = key.toString("hex");
        key = new Int32Array(
          encryptionKey.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
        );
        var len = zipBuffer.length;
        var iv = new Int32Array(
          ultranote
            .toHexString(len)
            .match(/.{1,2}/g)
            .map((byte) => parseInt(byte, 16))
        );
        var cipher = new Chacha8(key, iv, zipBuffer);
        var buffer_cipher = Buffer.from(cipher);

        let upload_form = new FormData();
        upload_form.append("file", buffer_cipher, "file");
        axios
          .post("http://backup.ultranote.org:5001/api/v0/add", upload_form, {
            headers: {
              ...upload_form.getHeaders(),
            },
          })
          .then((response) => {
            if (response && response.data) {
              var hash = response.data.Hash;
              sendMessage(fields, hash, encryptionKey, res);
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      } else {
        sendMessage(fields, "", "", res);
      }
    });
  },
  async downloadAttachment(req, res) {
    const transactionId = req.body.transactionId;
    const attachment = req.body.attachment;
    const encryptionKey = req.body.encryptionKey;

    http.get(
      url.parse("http://backup.ultranote.org:8080/ipfs/" + attachment),
      function (file_res) {
        var data = [];

        file_res
          .on("data", function (chunk) {
            data.push(chunk);
          })
          .on("end", function () {
            var buffer = Buffer.concat(data);
            var key = new Int32Array(
              encryptionKey.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
            );
            var len = buffer.length;
            var iv = new Int32Array(
              ultranote
                .toHexString(len)
                .match(/.{1,2}/g)
                .map((byte) => parseInt(byte, 16))
            );
            var file_data = Int32Array.from(buffer);
            var cipher = new Chacha8(key, iv, file_data);
            var buffer_cipher = Buffer.from(cipher);

            var readStream = stream.PassThrough();
            readStream.end(buffer_cipher);

            res.set(
              "Content-disposition",
              "attachment; filename=" + transactionId + ".zip"
            );
            res.set("Content-Type", "application/zip");

            readStream.pipe(res);
          });
      }
    );
  },

  async getAllMessages(req, res) {
    const userId = req.body.id;
    let msgList = [];

    try {
      const wallets = await Wallets.find({ walletHolder: userId });
      for (let i = 0; i < wallets.length; i++) {
        const wallet = wallets[i];
        const walletAddress = wallet.address;

        const opts = {
          firstBlockIndex: 203000,
          blockCount: 500000,
          addresses: [walletAddress],
        };

        const data = await xuni.getTransactions(opts);
        const unconfirmed_data = await xuni.getUnconfirmedTransactionHashes();

        for (let i = 0; i < data.items.length; i++) {
          const item = data.items[i];
          for (let j = 0; j < item.transactions.length; j++) {
            const transaction = item.transactions[j];
            try {
              let transaction_message = await ultranote.getTransaction(
                transaction.transactionHash
              );
              const db_msg = await Messages.findOne({
                hash: transaction.transactionHash,
              });
              if (db_msg && db_msg.message) {
                transaction_message =
                  '"message":"' + db_msg.message + '","type":"0"';
              }
              var message_list = transaction_message.split('"message":"');
              for (let k = 0; k < message_list.length; k++) {
                var msg_list = message_list[k].split('","type"');
                if (k > 0 && msg_list.length > 0 && msg_list[0].length > 0) {
                  var html = msg_list[0].split("\n");
                  let headers = [];
                  let length = 0;
                  for (let m = 1; m < html.length; m++) {
                    var header = html[m - 1];
                    header = header.split(": ");
                    if (header.length > 1) {
                      header_body = header.splice(1, header.length - 1);
                      headers.push({
                        name: header[0],
                        value: header_body.join(": "),
                      });
                      length++;
                    } else {
                      break;
                    }
                  }
                  if (html.length > 2) {
                    length++;
                    var body = html.splice(length, html.length - length);
                    html = body.join("\n");
                  } else {
                    html = msg_list[0];
                  }

                  var origin_html = html;
                  html = html.replace(/<style([\s\S]*?)<\/style>/gi, "");
                  html = html.replace(/<script([\s\S]*?)<\/script>/gi, "");
                  html = html.replace(/<\/div>/gi, "");
                  html = html.replace(/<\/li>/gi, "");
                  html = html.replace(/<li>/gi, "  *  ");
                  html = html.replace(/<\/ul>/gi, "");
                  html = html.replace(/<\/p>/gi, "");
                  html = html.replace(/<br\s*[\/]?>/gi, "");
                  html = html.replace(/<[^>]+>/gi, "");
                  html = html.replace(/\n\n/, "");

                  let amount = transaction.fee;
                  if (transaction.amount > 0) {
                    amount += transaction.amount;
                  }
                  msgList.push({
                    message: html,
                    full_message: origin_html,
                    headers: headers,
                    timestamp: transaction.timestamp,
                    datetime: new Date(transaction.timestamp * 1000)
                      .toISOString()
                      .slice(0, 19)
                      .replace("T", " ")
                      .slice(0, 16),
                    totalAmount: transaction.amount,
                    amount: amount,
                    walletAddress: walletAddress,
                    type: transaction.amount > 0 ? "IN" : "OUT",
                    blockHeight: transaction.blockIndex,
                    hash: transaction.transactionHash,
                  });
                }
              }
            } catch (ex) {
              console.log(ex);
            }
          }
        }

        for (let j = 0; j < unconfirmed_data.transactionHashes.length; j++) {
          const hash = unconfirmed_data.transactionHashes[j];

          try {
            let transaction_msg = await ultranote.getTransaction(hash);
            const db_msg = await Messages.findOne({ hash: hash });
            let transaction_message = transaction_msg;
            var message_list = transaction_message.split('"message":"');
            for (let k = 0; k < message_list.length; k++) {
              var msg_list = message_list[k].split('","type"');
              if (k > 0 && msg_list.length > 0 && msg_list[0].length > 0) {
                var html = msg_list[0].replace(/"/gi, '\\"');
                transaction_message = transaction_message.replace(
                  msg_list[0],
                  ""
                );
              }
            }
            var transaction = JSON.parse(transaction_message);
            transaction = transaction.result.transaction;
            if (db_msg && db_msg.message) {
              transaction_message =
                '"message":"' + db_msg.message + '","type":"0"';
              message_list = transaction_message.split('"message":"');
            }
            for (let k = 0; k < message_list.length; k++) {
              var msg_list = message_list[k].split('","type"');
              if (k > 0 && msg_list.length > 0 && msg_list[0].length > 0) {
                var html = msg_list[0].split("\n");
                let headers = [];
                let length = 0;
                for (let m = 1; m < html.length; m++) {
                  var header = html[m - 1];
                  header = header.split(": ");
                  if (header.length > 1) {
                    header_body = header.splice(1, header.length - 1);
                    headers.push({
                      name: header[0],
                      value: header_body.join(": "),
                    });
                    length++;
                  } else {
                    break;
                  }
                }
                if (html.length > 2) {
                  length++;
                  var body = html.splice(length, html.length - length);
                  html = body.join("\n");
                } else {
                  html = msg_list[0];
                }

                var origin_html = html;
                html = html.replace(/<style([\s\S]*?)<\/style>/gi, "");
                html = html.replace(/<script([\s\S]*?)<\/script>/gi, "");
                html = html.replace(/<\/div>/gi, "");
                html = html.replace(/<\/li>/gi, "");
                html = html.replace(/<li>/gi, "  *  ");
                html = html.replace(/<\/ul>/gi, "");
                html = html.replace(/<\/p>/gi, "");
                html = html.replace(/<br\s*[\/]?>/gi, "");
                html = html.replace(/<[^>]+>/gi, "");
                html = html.replace(/\n\n/, "");

                let amount = transaction.fee;
                if (transaction.amount > 0) {
                  amount += transaction.amount;
                }
                msgList.push({
                  message: html,
                  full_message: origin_html,
                  headers: headers,
                  timestamp: transaction.timestamp,
                  datetime:
                    transaction.timestamp > 0
                      ? new Date(transaction.timestamp * 1000)
                          .toISOString()
                          .slice(0, 19)
                          .replace("T", " ")
                          .slice(0, 16)
                      : "-",
                  totalAmount: transaction.amount,
                  amount: amount,
                  walletAddress: walletAddress,
                  type: transaction.amount > 0 ? "IN" : "OUT",
                  blockHeight: transaction.blockIndex,
                  hash: transaction.transactionHash,
                });
              }
            }
          } catch (ex) {
            console.log(ex);
          }
        }
        for (let i = 0; i < msgList.length; i++) {
          for (let j = i + 1; j < msgList.length; j++) {
            if (msgList[i].blockHeight < msgList[j].blockHeight) {
              let temp = msgList[i];
              msgList[i] = msgList[j];
              msgList[j] = temp;
            }
          }
        }
        res.status(200).json({ msgList });
      }
    } catch (error) {
      console.log("*".repeat(50), "Error: ", error);
      res.status(500).json(error);
    }
  },
  async getTransactions(req, res) {
    // try {
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
          const transaction_message = await ultranote.getTransaction(
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

        const transactionFromDb = await Transactions.findOne({
          hash: transaction.transactionHash,
        });

        const note = transactionFromDb ? transactionFromDb.note : "";

        transactionObj = {
          senderAdress: senderAddress,
          recipientAdress: recipientAddress,
          updatedAt: new Date(transaction.timestamp * 1000).toISOString(),
          amount: Math.abs(transaction.transfers[0].amount),
          note,
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
  async getBalance(req, res) {
    try {
      const { address } = req.params;
      const balance = await xuni.getBalance(address.trim());
      res.status(200).json({ message: "BALANCE:", balance });
    } catch (error) {
      res.json(error);
    }
  },
  async optimizeWallet(req, res) {
    let errorMsg = "";
    try {
      if (req && req.body && req.body.payload && req.body.payload.id) {
        const walletId = req.body.payload.id;
        const wallets = await Wallets.findOne({ _id: walletId });
        if (wallets && wallets.address) {
          const result = await xuni.estimateFusion({
            threshold: 100000,
            addresses: [wallets.address],
          });

          if (result && result.readyCount > 0) {
            const fresult = await xuni.sendFusionTransaction({
              threshold: 100000,
              addresses: [wallets.address],
              destinationAddress: wallets.address,
            });
            console.log("sendFusionTx:", fresult);
            res.status(200).json({ message: "Success", result: fresult });
            return;
          }
          errorMsg = "A fusion transaction cannot be created.";
        } else errorMsg = "Unknow wallet id.";
      } else errorMsg = "Wallet id is required";
    } catch (error) {
      errorMsg = "Error during fusion process.";
      console.log("optimizeWallet.catch:", error);
    }
    res.status(500).json({ message: errorMsg, result: "" });
  },
};

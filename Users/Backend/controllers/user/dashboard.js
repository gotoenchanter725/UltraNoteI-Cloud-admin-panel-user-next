const XUNI = require("ultranotei-api");
const User = require("../../models/user");
const Wallets = require("../../models/wallet");
const Transactions = require("../../models/transactions");
// const xuni = new XUNI(process.env.XUNI_HOST, process.env.XUNI_PORT);
const xuni = new XUNI({
  daemonHost: process.env.XUNI_HOST,
  walletHost: process.env.XUNI_HOST,
  daemonRpcPort: process.env.DAEMONRPC_PORT,
  walletRpcPort: process.env.XUNI_PORT,
  rpcUser: process.env.RPC_USER,
  rpcPassword: process.env.RPC_PASSWORD,
});

const uniqid = require("uniqid");
var fs = require("fs");
module.exports = {
  async getDepositsAndWithdrawls(req, res) {
    try {
      let userId = req.body.id;
      let userWalletAddress = "";
      const withdrawDataByMonth = [];
      const depositDataByMonth = [];
      const withdrawDataByDay = [];
      const depositDataByDay = [];
      let monthNames = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let today = new Date();
      let d;
      let lastSixthMonth = new Date();
      lastSixthMonth.setDate(1);
      lastSixthMonth.setMonth(today.getMonth() - 5);
      let lastSeventhDay = new Date();
      lastSeventhDay.setDate(today.getDate() - 6);
      let walletsAddresses = [];
      let transactionAddrs = [];
      try {
        const wallets = await Wallets.find({ walletHolder: userId });
        for (let i = 0; i < wallets.length; i++) {
          const wallet = wallets[i];
          walletsAddresses.push(wallet.address);
        }
        const opts = {
          firstBlockIndex: 203000,
          blockCount: 500000,
          addresses: walletsAddresses,
        };
        const totalTransactions = await xuni.getTransactions(opts);
        let withdrawByMonth = [];
        let withdrawByDay = [];
        let depositByMonth = [];
        let depositByDay = [];
        let times = [[], [], [], [], []];

        totalTransactions.items.forEach((element) => {
          element.transactions.forEach((transaction) => {
            const senderAddress =
              transaction.transfers[1].address != ""
                ? transaction.transfers[1].address
                : uniqid();
            const recipientAddress = transaction.transfers[0].address;
            transactionAddrs.push([senderAddress, recipientAddress]);
            const amount = Math.abs(transaction.transfers[0].amount);
            const hash = transaction.transactionHash;
            const timestamp = transaction.timestamp * 1000;
            if (timestamp >= lastSixthMonth.getTime());
            {
              if (walletsAddresses.indexOf(senderAddress) != -1) {
                times[0].push(timestamp);
                var date = new Date(timestamp);
                const m = monthNames[date.getMonth()];
                if (m in withdrawByMonth) {
                  withdrawByMonth[m] += amount;
                } else {
                  withdrawByMonth[m] = amount;
                }
              }

              if (walletsAddresses.indexOf(recipientAddress) != -1) {
                times[1].push(timestamp);
                var date = new Date(timestamp);
                const m = monthNames[date.getMonth()];
                if (m in depositByMonth) {
                  depositByMonth[m] += amount;
                } else {
                  depositByMonth[m] = amount;
                }
              }
            }
            if (timestamp >= lastSeventhDay.getTime());
            {
              times[2].push(timestamp);
              if (walletsAddresses.indexOf(senderAddress) != -1) {
                times[3].push(timestamp);
                var date = new Date(timestamp);
                const m = dayNames[date.getDay()];
                if (m in withdrawByDay) {
                  withdrawByDay[m] += amount;
                } else {
                  withdrawByDay[m] = amount;
                }
              }

              if (walletsAddresses.indexOf(recipientAddress) != -1) {
                times[4].push(timestamp);
                var date = new Date(timestamp);
                const m = dayNames[date.getDay()];
                if (m in depositByDay) {
                  depositByDay[m] += amount;
                } else {
                  depositByDay[m] = amount;
                }
              }
            }
          });
        });

        for (let i = 5; i >= 0; i -= 1) {
          d = new Date(today.getFullYear(), today.getMonth() - i, 1);
          withdrawDataByMonth.push({
            month: monthNames[d.getMonth()],
            actual: withdrawByMonth[monthNames[d.getMonth()]] | 0,
          });
          depositDataByMonth.push({
            month: monthNames[d.getMonth()],
            actual: depositByMonth[monthNames[d.getMonth()]] | 0,
          });
        }

        for (let i = 6; i >= 0; i--) {
          d = new Date();
          d.setDate(today.getDate() - i);
          withdrawDataByDay.push({
            x: dayNames[d.getDay()],
            y: withdrawByDay[dayNames[d.getDay()]] | 0,
          });
          depositDataByDay.push({
            x: dayNames[d.getDay()],
            y: depositByDay[dayNames[d.getDay()]] | 0,
          });
        }

        res
          .status(200)
          .json([
            withdrawDataByMonth,
            depositDataByMonth,
            withdrawDataByDay,
            depositDataByDay,
            times,
            transactionAddrs,
            walletsAddresses,
            totalTransactions.items,
          ]);
      } catch (error) {
        res.status(500).json(error);
        fs.writeFile("dashboard-cahrt-error1.txt", error, function (err) {
          if (err) return console.log(err);
          console.log("Hello World > helloworld.txt");
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
      fs.writeFile("dashboard-cahrt-error.txt", error, function (err) {
        if (err) return console.log(err);
        console.log("Hello World > helloworld.txt");
      });
    }
  },
};

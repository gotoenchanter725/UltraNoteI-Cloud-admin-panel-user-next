/* eslint consistent-return:0 import/order:0 */

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//defining app as the main Express Handler
const app = express();

//router imports
const apiRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const walletsRoute = require("./routes/wallets");
const dashboardRoute = require("./routes/dashboard");
const adminRoute = require("./routes/adminauthroute");
const notificationsRoute = require("./routes/notifications");

//Express setting-up
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/qubucket", express.static("qubucket"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//routing
app.use("/api", apiRoute);
app.use("/api/users", usersRoute);
app.use("/api/wallets", walletsRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/admin", adminRoute);
app.use("/api/notifications", notificationsRoute);

//Mongoose DataBase connection
mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((error) => {
    console.log("ERROR OUCCURED", error);
  });

//lancing the server
app.listen(process.env.RUNNING_PORT || 3600, () => {
  console.log(`Listening on port: ${process.env.RUNNING_PORT || "3600"} `);
});

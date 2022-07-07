const User = require("../../models/user");
const bcrypt = require("bcrypt");
const helper = require("../../helpers/activationMail");
const jwt = require("jsonwebtoken");
const user = require("../../models/user");
const UserActivity = require("../../models/user_activity");
const { request } = require("express");
const requestIp = require("request-ip");
const geoip = require("geoip-lite");

module.exports = {
  async registerUser(req, res) {
    try {
      if (!req.body.mail && !req.body.password) {
        return res.status(400).json({ message: "No empty fields allowed" });
      }
      const mail = req.body.mail;
      const password = req.body.password;
      mail.toLowerCase();
      const emailExist = await User.findOne({ mail: mail });
      if (emailExist)
        return res.status(400).json({ message: "Email already exist!" });
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        // phone: req.body.phone,
        mail: mail,
        password: passwordHash,
      });
      user.save().then(async (savedUser) => {
        try {
          const token = jwt.sign({ data: savedUser }, process.env.TOKENCODE, {
            expiresIn: "168h",
          });
          const result = helper.ActivationMail(savedUser, token);
          if (result) {
            res.status(200).json({ message: "User add successfully" });
          }
        } catch (error) {
          console.log(error.message);
          res
            .status(400)
            .json({
              message:
                console.log(error) +
                " failed while sending the activation mail",
              error,
            });
        }
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: "ERROR WHILE CREATING AN ACCOUNT", error });
    }
  },

  async activateAccount(req, res) {
    try {
      const ip = requestIp.getClientIp(req);
      const geo = geoip.lookup(ip) || { city: "", country: "" };
      const token = req.params.token;

      if (!token) {
        res.status(400).json({ message: "No token provided" });
      } else {
        const decodedToken = jwt.verify(token, process.env.TOKENCODE);

        try {
          await User.updateOne(
            { _id: decodedToken.data._id },
            {
              $set: {
                isActive: true,
              },
            }
          );

          const newUserActivity = {
            userId: decodedToken.data._id,
            action: "Account Activate",
            source: "Web",
            ip: ip,
            location: geo.city + " " + geo.country,
            date: Date.now(),
          };
          await UserActivity.create(newUserActivity);

          return res.redirect(
            `${process.env.HOST}${process.env.PORT_FRONT}/login/successfulInvitation`
          );
        } catch (error) {
          console.log(error);
          return res.status(400).json({ message: "ERROR OUCCURED", error });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "ERROR OUCCURED", error });
    }
  },
};

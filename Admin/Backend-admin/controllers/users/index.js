const { Types } = require("mongoose");
const { ObjectId } = Types;
const User = require("../../models/user");

module.exports = {
  async userList(req, res) {
    await User.aggregate([
      {
        $lookup: {
          from: "wallets",
          localField: "_id",
          foreignField: "walletHolder",
          as: "wallet",
        },
      },
    ])
      .then((users) => {
        if (!users) {
          return res.status(400).json({ message: "Users not found" });
        }
        return res.status(200).json({ users });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ message: "ERROR WHILE LOGGING IN", err });
      });
  },
  async suspendedUser(req, res) {
    await User.find({ suspended: true })
      .then((users) => {
        if (!users) {
          return res.status(400).json({ message: "suspended Users not found" });
        }
        return res.status(200).json({ users });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ message: "ERROR WHILE LOGGING IN", err });
      });
  },
  async deletedUser(req, res) {
    await User.find({ deleted: true })
      .then((users) => {
        if (!users) {
          return res.status(400).json({ message: " deleted Users not found" });
        }
        return res.status(200).json({ users });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ message: "ERROR WHILE LOGGING IN", err });
      });
  },
  async pendingEmial(req, res) {
    await User.find({ isActive: false })
      .then((users) => {
        if (!users) {
          return res.status(400).json({ message: "pending users not found" });
        }
        return res.status(200).json({ users });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ message: "ERROR WHILE LOGGING IN", err });
      });
  },
  // New developer working on Active User
  async ActiveUser(req, res) {
    await User.find({ isActive: true })
      .then((users) => {
        if (users) {
          return res.status(200).json({ users });
        }
        return res.status(200).json({ message: "Active User Is Not Found" });
      })
      .catch((err) => {
        console.log(err);
        return res.status(200).json({ message: "ERROR WHILE LOGGING IN", err });
      });
  },

  async addUser(req, res) {
    try {
      if (!req.body.firstName || !req.body.lastName || !req.body.mail) {
        return res.status(400).json({
          message: "FirstName, lastName and Email fields are required",
        });
      }
      const mail = req.body.mail;
      mail.toLowerCase();
      const emailExist = await User.findOne({ mail: mail });
      if (emailExist)
        return res.status(400).json({ message: "Email already exist!" });
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mail: mail,
        // phone: req.body.phone,
        role: req.body.role,
      });
      const savedUser = await user.save().then((user) => {
        /* const mailTemplat = `Account created ...`
            mailer.sendEmail('verify@Crypto-Petty.com', user.mail , 'please verfiy your account', html);*/
        res.status(200).json({ message: "User added successfully" });
      });
    } catch (error) {
      res.status(400).json({ message: "ERROR WHILE ADDING USER", error });
    }
  },
  async suspendUser(req, res) {
    try {
      if (!req.body.userId) {
        return res.status(400).json({
          message: "UserId  is required",
        });
      }
      const { userId } = req.body;
      const suspendedUser = await User.findOneAndUpdate(
        { _id: ObjectId(userId) },
        { $set: { suspended: true } }
      );
      if (!suspendedUser)
        return res.status(400).json({ message: "user doesn't exist!" });
      else res.status(200).json({ message: "User suspended successfully" });
    } catch (error) {
      res.status(400).json({ message: "ERROR WHILE ADDING USER", error });
    }
  },

  async deleteUser(req, res) {
    try {
      if (!req.body.userId) {
        return res.status(400).json({
          message: "UserId  is required",
        });
      }
      const { userId } = req.body;
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser)
        return res.status(400).json({ message: "user doesn't exist!" });
      else res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "ERROR WHILE ADDING USER", error });
    }
  },
  async activateEmail(req, res) {
    try {
      if (!req.body.userId) {
        return res.status(400).json({
          message: "UserId  is required",
        });
      }
      const { userId } = req.body;
      const pendingEmail = await User.findOneAndUpdate(
        { _id: userId },
        { isActive: true },
        {
          new: true,
        }
      );
      if (!pendingEmail)
        return res.status(400).json({ message: "user doesn't exist!" });
      else res.status(200).json({ message: "User activated successfully" });
    } catch (error) {
      res.status(400).json({ message: "ERROR WHILE ADDING USER", error });
    }
  },
  async userProfile(req, res) {
    try {
      if (!req.body.userId) {
        return res.status(400).json({
          message: "UserId  is required",
        });
      }
      const { userId } = req.body;
      const userProfile = await User.findById(ObjectId(userId));
      if (!userProfile)
        return res.status(400).json({ message: "user doesn't exist!" });
      else res.status(200).json({ user: userProfile });
    } catch (error) {
      res.status(400).json({ message: "ERROR WHILE ADDING USER", error });
    }
  },
  async userProfileUpdate(req, res) {
    try {
      if (!req.body.userId) {
        return res.status(400).json({
          message: "UserId  is required",
        });
      }
      const { userId } = req.body;
      const suspendedUser = await User.findOneAndUpdate(
        { _id: ObjectId(userId) },
        { $set: { suspended: true } }
      );
      if (!suspendedUser)
        return res.status(400).json({ message: "user doesn't exist!" });
      else res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res.status(400).json({ message: "ERROR WHILE UPDATING USER", error });
    }
  },
  async profileUpdate(req, res) {
    try {
      if (!req.body._id) {
        return res.status(400).json({
          message: "User's _id is required",
        });
      }
      const {
        _id,
        firstname,
        mail,
        lastname,
        // phone,
        currency,
        isActive,
        two_factor_auth,
      } = req.body;

      const profileUpdated = await User.findOneAndUpdate(
        { _id: ObjectId(_id) },
        {
          $set: {
            firstName: firstname,
            lastName: lastname,
            // phone: phone,
            mail: mail,
            currency: currency,
            isActive: isActive,
            two_factor_auth: two_factor_auth,
          },
        }
      );
      if (!profileUpdated)
        return res.status(400).json({ message: "user doesn't exist!" });
      else res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res.status(400).json({ message: "ERROR WHILE UPDATING USER", error });
    }
  },
};

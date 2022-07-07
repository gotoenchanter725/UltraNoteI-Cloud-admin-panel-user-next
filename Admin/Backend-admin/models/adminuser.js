const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    unique: true,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  userImage: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
    required: false,
  },
  gauthidt: {
    type: String,
    required: true,
    unique: true,
  },
  gsecrettoken: {
    type: String,
    required: true,
  },
  gsecretqrcode: {
    type: String,
    required: true,
  },
  faactive: { type: Boolean, default: true },
  password: { type: String, required: true },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Admin", Schema);

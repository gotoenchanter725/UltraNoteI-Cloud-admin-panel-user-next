const mongoose = require('mongoose');

const SettingsSchema = mongoose.Schema(
  {
    type: { type: String, required: true },
    key: { type: String, required: true },
    value: { type: String, required: true },
    additional: String
  },
  { timestamps: true },
);

module.exports = mongoose.model('Settings', SettingsSchema);

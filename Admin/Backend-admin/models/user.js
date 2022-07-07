const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mail: { type: String, required: true },
    phone: { type: String, required: false },
    password: {
      type: String,
      min: 8,
      max: 18,
      required: true,
      default: 'new_user',
    },
    role: { type: String, required: true, default: 'user' },
    image: { type: String, require: false },
    isActive: { type: Boolean, default: false, required: true },
    two_fact_auth: { type: Boolean, default: false, required: true },
    two_fact_auth_code: { type: Number, default: null },
    creationDate: { type: Date, default: Date.now() },
    contacts: { type: [Object], default: null },
    isWalletCreated: { type: Boolean, default: false },
    currency: { type: String, default: 'usd' },
    suspended: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);

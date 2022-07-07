const fs = require("file-system");

module.exports = function user_data(user) {
  let image = "";

  try {
    image = fs
      .readFileSync(process.env.DATA_DIR + user.image + ".png")
      .toString();
  } catch {
    image = undefined;
  }
  return (userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    mail: user.mail,
    // phone: user.phone,
    image: image,
    createdAt: user.creationDate,
    two_fact_auth: user.two_fact_auth,
    isActive: user.isActive,
    contacts: user.contacts,
    isWalletCreated: user.isWalletCreated,
    currency: user.currency,
    id: user._id,
  });
};

const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  async loginUser(req, res) {
    if (!req.body.mail || !req.body.password) {
      return res.status(400).json({ message: 'No empty fields allowed' });
    }
    await User.findOne({ mail: req.body.mail })
      .then(user => {
        if (!user) {
          return res.status(400).json({ message: 'E-mail is wrong' });
        } else if (user.role !== 'admin') {
          return res.status(400).json({
            message: 'Unauthorized access to none admin user',
          });
        }
        return bcrypt.compare(req.body.password, user.password).then(result => {
          if (!result) {
            return res.status(400).json({ message: 'Password is wrong' });
          }
          // if (!user.isActive) {
          //   return res.status(400).json({
          //     message: 'Account is not active yet',
          //   });
          // }
          const token = jwt.sign({ data: user }, 'Hakona_Matata', {
            expiresIn: '72h',
          });
          return res.status(200).json({
            message: 'login successful',
            user,
            token,
          });
        });
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json({ message: 'ERROR WHILE LOGGING IN', err });
      });
  },
};

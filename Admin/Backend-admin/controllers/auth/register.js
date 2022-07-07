const User = require('../../models/user');
const bcrypt = require('bcrypt');

module.exports = {
    async registerUser(req, res) {
       try {
        if (!req.body.mail && !req.body.password) {
            return res.status(400).json({message: 'No empty fields allowed'});
        }
        const mail = req.body.mail;
        const password = req.body.password;
        mail.toLowerCase();
        const emailExist = await User.findOne({mail: mail});
        if (emailExist) return res.status(200).json({message: 'Email already exist!'});
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await  bcrypt.hash(password, salt);
        const user = new User({
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mail: mail,
            password: passwordHash,
        });
        const savedUser = await user.save().then(user => {
            /* const mailTemplat = `Account created ...`
            mailer.sendEmail('verify@Crypto-Petty.com', user.mail , 'please verfiy your account', html);*/
            res.status(200).json({message: 'User add successfully'});
        })
       } catch (error) {
           res.status(400).json({message: 'ERROR WHILE CREATING AN ACCOUNT', error});
       }
    }
}
const user = require('../../models/user');
const UserActivity = require('../../models/user_activity');
const User = require('../../models/user');
const Helpers = require('../../helpers/resetPasswordMail');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');


module.exports = {
    async resetPassword_snedingMail(req, res) {
        try {
            if (!req.body.mail) {
                res.status(400).json({message: 'No empty field allowed'})
            } else {
                User.findOne({mail: req.body.mail}).then(async (user) => {
                    if (user) {
                        const token = jwt.sign({data: user}, process.env.TOKENCODE, {expiresIn: '168h'});
                    const result =  Helpers.ResetPasswordMail(user, token);
                    if (result) {
                        res.status(200).json({message: 'We sent you password reset mail'});
                    } else {
                        res.status(400).json({message: 'faild to resetPassword try again later'});
                    }
                    }
                    else {
                        res.status(404).json({message: 'User not found'});
                    }
                    
                });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({mssage: 'ERROR OUCCURED', error})
        }
    },


    async resetPassword_decodemail(req, res) {
        try {
            if (!req.params.token) {
                res.status(400).json({message: 'No token provided'});
            } else {
                const token = req.params.token;
                    res.status(200)
                    .redirect(`${process.env.HOST}${process.env.PORT_FRONT}/newpassword/`+token);
            }
        } catch (error) {
            console.log(error);
            res.status(200).json({message: 'ERROR OUCCURED', error})
        }
    },



    async resetPassword_newPassword(req, res) {
        try {
            const ip = requestIp.getClientIp(req);
            const geo = geoip.lookup(ip) || {city: '', country: ''};
            if (!req.body.password || !req.params.token) {
                res.status(400).json({message: 'No empty field allowed'});
            } else {
                const token = req.params.token;
                const password = req.body.password;
                const payload = jwt.verify(token, process.env.TOKENCODE);
                const id = payload.data._id;
                const salt = await bcrypt.genSalt(10);
                const passwordHash = await bcrypt.hash(password, salt);
                await User.updateOne({_id: id}, {
                    $set: {
                        password: passwordHash
                    }
                }).then(user => {
                    res.status(200).json({message: 'password updated successfully'});
                }).catch(error => {
                    res.status(400).json({message: 'ERROR WHILE SETTING THE NEW PASSWORD', error});
                });

                const newUserActivity = {
                    userId: id,
                    action: 'Password Reset',
                    source: 'Web',
                    ip: ip,
                    location: geo.city + " " + geo.country,
                    date: Date.now(),
                }
            
                await UserActivity.create(newUserActivity);
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'ERROR OCCURED'});
        }
    }
}
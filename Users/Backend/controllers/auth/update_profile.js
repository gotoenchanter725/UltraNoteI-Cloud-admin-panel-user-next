const User = require('../../models/user');
const UserActivity = require('../../models/user_activity');
const user_data = require('../user/user_data');
const jwt = require('jsonwebtoken');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');
const uniqid = require('uniqid');
const fs = require('file-system')

module.exports = {
    async update_profile(req, res) {
        try {
            const token = req.params.token;
            let image = req.body.image;
            const first_name = req.body.firstName;
            const last_name = req.body.lastName;
            const email = req.body.email;
            const payload = jwt.verify(token, process.env.TOKENCODE);
            const id = payload.data._id;
            const ip = requestIp.getClientIp(req);
            const geo = geoip.lookup(ip) || {city: '', country: ''};

            let filename = uniqid();
            if ( image != undefined && image.length > 0 ) {
                image = 'data:image/png;base64,' + image;
                fs.writeFile(process.env.DATA_DIR + filename + '.png', image)
            }

            User.updateOne({ _id: id }, {
                $set: {
                    image: filename,
                    firstName: first_name,
                    lastName: last_name,
                    mail: email
                }
            }).then( async (user) => {
                user = await User.findOne({ _id: id });

                const userData = user_data(user);

                res.status(200).json({ message: 'Profile Updated Successfully', userData });
            }).catch(error => {
                res.status(400).json({ message: 'ERROR WHILE UPDATING PROFILE', error });
            });

            const newUserActivity = {
                userId: id,
                action: 'Profile Update',
                source: 'Web',
                ip: ip,
                location: geo.city + " " + geo.country,
                date: Date.now(),
            }

            await UserActivity.create(newUserActivity);
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: 'ERROR OCCURED' });
        }
    }
}

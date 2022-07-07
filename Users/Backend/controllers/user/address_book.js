const User = require('../../models/user');
const UserActivity = require('../../models/user_activity');
const user_data = require('./user_data');
const Wallets = require('../../models/wallet');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');

module.exports = {

    async addContact(req, res) {
        try {
            let userId = req.body.id;
            let label = req.body.label;
            let address = req.body.address;
            const ip = requestIp.getClientIp(req);
            const geo = geoip.lookup(ip) || {city: '', country: ''};
            
            let user = await User.findOne({_id: userId});
            if (user.contacts){
                user.contacts.push([label, address]);
            } else {
                user.contacts = [label, address];
            }

            await User.updateOne({_id: userId}, { 
                $set: {
                    contacts: user.contacts
                }
            });

            user = await User.findOne({ _id: userId });

            const userData = user_data(user);
            const newUserActivity = {
                userId: userId,
                action: 'Add Address',
                source: 'Web',
                ip: ip,
                location: geo.city + " " + geo.country,
                date: Date.now(),
            }
        
            await UserActivity.create(newUserActivity);

            res.status(200).json({ message: 'Contact Added Successfully', userData });
        }
        
        catch (error) {
            res.status(400).json({ message: 'ERROR WHILE ADDING CONTACT', error });
            console.log(error)
            res.status(500).json(error)
        }
    },

    async deleteContact(req, res){
        try{
            let id = req.body.id;
            let deletedContact = req.body.deleteRow;
            const ip = requestIp.getClientIp(req);
            const geo = geoip.lookup(ip) || {city: '', country: ''};

            let user = await User.findOne({_id: id});
            let userContacts = user.contacts;

            userContacts.splice(deletedContact, 1);

            await User.updateOne({_id: id}, {
                $set: {contacts: userContacts}
            });

            user = await User.findOne({ _id: id });

            const userData = user_data(user);

            const newUserActivity = {
                userId: id,
                action: 'Delete Address',
                source: 'Web',
                ip: ip,
                location: geo.city + " " + geo.country,
                date: Date.now(),
            }
        
            await UserActivity.create(newUserActivity);

            res.status(200).json({ message: 'Contact Deleted Successfully', userData });
            

        } catch(error){
            console.log(error);
            res.status(500).json(error)
        }
    }
}
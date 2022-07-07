const User = require('../../models/user');

module.exports = {
    async change_2FA(req, res) {
        try {
            const id = req.body._id;
            const isActive = req.body.isActive;
            User.findByIdAndUpdate({_id: id}, { two_fact_auth: isActive }).then(user => {
                if (isActive === true) {
                    res.status(200).json({message: '2FA enabled'});
                } else {
                    res.status(200).json({message: '2FA disabled'});
                }
            }).catch(err => {
                res.status(400).json({message: 'ERROR WHILE CHANGING THE 2FA STATE'});
            });
        } catch (error) {
            res.status(400).json({message: 'ERROR OUCURED'})
        }
    },

    async change_currency(req, res){
        try {
            const id = req.body.id;
            const currency = req.body.currency;

            await User.findByIdAndUpdate({_id: id}, { currency: currency });
            res.status(200).json({message: 'currency changed'});

        } catch (error){
            console.log(error);
            res.status(400).json({message: 'ERROR OUCURED'})
        }
    }
}
const UserActivity = require('../../models/user_activity');

module.exports = {
    async getUserActivity(req, res) {
        try {
            let id = req.body.id;
            const userActivity = await UserActivity.find({ userId: id });
            res.status(200).json(userActivity);

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
}
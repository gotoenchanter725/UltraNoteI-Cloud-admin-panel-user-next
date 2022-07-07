
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];

		if (!token) {
			return res.status(403).send('Not authorized');
		}
		const decodedToken = jwt.verify(token, process.env.TOKENCODE);
		next();
	} catch (err) {
		console.log(err);
		res.status(401).send(err);
	}
};

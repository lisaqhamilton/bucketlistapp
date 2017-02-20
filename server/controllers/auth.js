var User = require('../models/user');

exports.signup = function(req, res, next) {
	//grab incoming request
	//#1
	var email = req.body.email;
	var password = req.body.password;

	//#2
	User.findOne({ email: email }, function(err, existingUser) {
		if(err) {
			return next("Go check the filing cabinet, that's the wrong email or password");
		}//handle search error

		if(existingUser) {
			return res.status(418).send("Quit trying to use someone else\'s login");

			//alternative: return res.status(418).send("Email is in use")
		}//handles existing users

		///3
		var user = new User({
			email: email,
			password: password
		});

		//To save the record to the DB.
		user.save(function(err) {
			if(err) { return next(err); }

		//4 Respond to request indicating the user was created
			res.json({ success: true });
		});
	});
}

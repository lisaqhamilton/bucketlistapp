var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config');

function createUserToken(user) {
	var timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}


exports.signup = function(req, res, next) {
	//grab incoming request
	//#1
	var email = req.body.email;
	var password = req.body.password;

	if( !email || !password){
		return res.status(418).send({error: "Come on! Quit cheating! You know you need an email and password"});
	}
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
			if(err) { 
				return next(err); }

		//4 Respond to request indicating the user was created
			res.json({ token: createUserToken(user) });
		});
	});
}

exports.signin = function(req, res, next) {
	//User has already had their email and pw auth; 
	res.send({ token: createUserToken(req.user) });
}

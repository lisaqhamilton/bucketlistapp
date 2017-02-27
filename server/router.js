var Auth = require('./controllers/auth');
var BucketList = require('./controllers/bucketlistcontroller.js');

var passportService = require('./services/passport');
var passport = require('passport');

var requireSignin = passport.authenticate('local', {session: false});
var requireAuth = passport.authenticate('jwt', {session: false});

module.exports = function(app) {

	app.post('/signup', Auth.signup);

	app.post('/signin', requireSignin, Auth.signin);

	app.post('/newitem', requireAuth, BucketList.addBucketList);

	app.get('/items', requireAuth, BucketList.fetchBucketLists);
	
}
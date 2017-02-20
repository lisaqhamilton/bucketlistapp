module.exports = function(app) {
	app.get('/', function(req, res, next) {
		res.send("How ya doing, home page!")
	});

	app.get('/', function(req,res,next){
		res.send("You just signed up for the best app you'll ever see. Grab a drink and prepare to be amazed");
	});
}
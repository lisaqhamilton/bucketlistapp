var BucketList = require('../models/bucketlist');

exports.addBucketList = function(req, res, next) {
	var title = req.body.title;
	var topic = req.body.topic;
	var url = req.body.url;
	var content = req.body.content;
	var specificUser = req.user._id;

	var bucketList = new BucketList({
		title: title,
		topic: topic,
		url: url,
		content: content,
		specificUser: specificUser
	});

	bucketList.save(function(err){
		if(err) {
			return next(err);
		}
		res.json(bucketList);
	});
}
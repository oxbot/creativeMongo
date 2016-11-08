var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = mongoose.model('Question');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/questions', function(req,res) {
	console.log("in questions");
	Question.find(function(err,questions) {
		if (err) {return next(err);}
		res.json(questions);
	});
});

router.post('/question', function(req, res, next) {
	console.log('in post question');
	console.log(req.body);

	var question = new Question(req.body);

	
	question.save(function (err, question) {
		if (err) {return next(err);}
		res.json(question);
	});
});

router.put('/answer/:id', function(req,res,next) {
	console.log('putting answer: ' + req.body['info'] + ' in id: ' + req.params.id)

	Question.findOneAndUpdate({_id: req.params.id}, {$push: { answers: req.body['info']} }, {new: true}, function(err, question) {
		if (err) {return next(err);}
		res.json(question);
	});
});

module.exports = router;

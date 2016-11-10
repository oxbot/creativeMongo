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

router.delete('/answer', function(req, res, next) {
console.log("In the delete route");
console.log(req.body);
Question.update({_id: req.body._id}, {$pull: { answers: req.body.answers} }, {multi : false} , function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
        }
    );

});

router.delete('/question', function(req, res, next) {
console.log("In the delete route");
console.log(req.body);
Question.remove({_id: req.body._id}, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
        }
    );

});

router.delete('/clear', function(req, res, next) {
console.log("In the clear route");
Question.remove({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
        }
    );

});


module.exports = router;

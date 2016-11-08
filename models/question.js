var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
	message: String,
	created: {type: Date, default: Date.now },
	answers: [String]
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;

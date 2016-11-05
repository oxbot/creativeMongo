var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
	message: String
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;

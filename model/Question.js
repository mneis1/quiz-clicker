const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: Number,
        required: true
    },
    choices : {
        type: Array,
        default: []
    }
});

module.exports = Question = mongoose.model('question', QuestionSchema);
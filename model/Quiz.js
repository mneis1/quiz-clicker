const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    questionIds : {
        type: Array,
        default: []
    },
    limit: {
        type: Number,
        default: 60
    }
});

module.exports = Quiz = mongoose.model('quiz', QuizSchema);
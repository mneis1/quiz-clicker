const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    quizId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    studentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    question: {
        type: Number,
        required: true
    },
    answer: {
        type: Number,
        required: true
    }
});

module.exports = Record = mongoose.model('record', RecordSchema);
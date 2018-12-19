const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    teacherId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    studentIds: {
        type: Array,
        default: []
    },
    quiz: {
        type: Boolean,
        default: false
    }
});

module.exports = Course = mongoose.model('course', CourseSchema);
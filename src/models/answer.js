const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assesment",
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    testCasesPassed: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Answer', answerSchema);

const mongoose = require('mongoose');

const assesmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        date: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    },
    startTime : {
        hours: {
            type: Number,
            required: true,
            min: 0,
            max: 23
        },
        minutes: {
            type: Number,
            required: true,
            min: 0,
            max: 59
        }
    },
    endTime : {
        hours: {
            type: Number,
            required: true,
            min: 0,
            max: 23
        },
        minutes: {
            type: Number,
            required: true,
            min: 0,
            max: 59
        }
    },
    questions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Question"
    },
    examinees: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    }
});

module.exports = mongoose.model('Assesment', assesmentSchema);

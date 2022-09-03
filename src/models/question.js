const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
    },
    statement: {
        type: String,
        required : true
    },
    inputFormat: {
        type: {
            type: [String],
            enum: ['int','float','double','String'],
            required: true
        },
        description: {
            type: [String],
            required: true
        }
    },
    outputFormat: 
        {
            type: {
                type: String,
                enum: ['int','float','double','String'],
                required: true
            },
            description: {
                type: String,
                required: true
            }
        },
    constraints: {
        type: [String],
    },
    sampleTestCases: {
        count: {
            type: Number,
            required: true
        },
        input: {
            type: [String],
            required : true
        },
        output: {
            type: [String],
            required : true
        },
        explanation: {
            type: [String],
            required : true
        }
    },
    testCases: {
        input: {
            type: [String],
            required: true
        },
        expectedOutput: {
            type: String,
            required: true
        }
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['easy','medium','hard']
    }
});

module.exports = mongoose.model('Question', questionSchema);

const mongoose = require('mongoose')

const Answer = require('../models/answer')

const addAnswer = async (answer) => {
    try {
        
        const isSubmittedPreviously = await Answer.find({
            $and: [
                {
                    exam: answer.exam
                },
                {
                    question: answer.question
                },
                {
                    userId: answer.userId
                }
            ]
        });
        
        if (isSubmittedPreviously.length==0) {
            const insertedAnswer = await Answer.create(answer);
            
            return insertedAnswer;
        }
        else {
            const insertedAnswer = await Answer.updateOne(
                {
                    _id: isSubmittedPreviously[0]._id
                },
                {
                    $set: {
                        answer: answer.answer,
                        testCasesPassed: answer.testCasesPassed
                    }
                }
            );
            
            return insertedAnswer;
        }
        
    } catch (error) {
        if (error.name === "ValidationError") {
            const dbError = new Error(`Validation error : ${error.message}`);
            dbError.type = "ValidationError";
            throw dbError;
        }

        if (error.name === "CastError") {
            const dbError = new Error(`Data type error : ${error.message}`);
            dbError.type = "CastError";
            throw dbError;
        }
    }
};

const findUsers = async (examId) => {
    try {
        
        const submittedAnswer = await Answer.find({
            exam: examId
            },
            {
                userId: true
            }).populate("userId");
        console.log(submittedAnswer);
        return submittedAnswer;
    } catch (error) {
        if (error.name === "ValidationError") {
            const dbError = new Error(`Validation error : ${error.message}`);
            dbError.type = "ValidationError";
            throw dbError;
        }

        if (error.name === "CastError") {
            const dbError = new Error(`Data type error : ${error.message}`);
            dbError.type = "CastError";
            throw dbError;
        }
    }
};

const findAnswerOfUser = async (examId, userId) => {
    try {
        
        const submittedAnswer = await Answer.find({
            $and: [
                {
                    exam: examId
                },
                {
                    userId : userId
                }
            ]},
            {
                question: true,
                answer: true,
                testCasesPassed: true
            }).populate("question");
        
        return submittedAnswer;
    } catch (error) {
        if (error.name === "ValidationError") {
            const dbError = new Error(`Validation error : ${error.message}`);
            dbError.type = "ValidationError";
            throw dbError;
        }

        if (error.name === "CastError") {
            const dbError = new Error(`Data type error : ${error.message}`);
            dbError.type = "CastError";
            throw dbError;
        }
    }
};

module.exports = {
    addAnswer,
    findUsers,
    findAnswerOfUser
}
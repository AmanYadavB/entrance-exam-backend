const mongoose = require('mongoose');
const Question = require("../models/question")
//const Assesment = require("../models/assesment");


const addQuestion = async (question) => {
    try {
        const insertedWorkshop = await Question.create(question);
        console.log(insertedWorkshop);
        return insertedWorkshop;
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

const getQuestions = async () => {
    try {
        const questions = await Question.find();
        console.log(questions);
        return questions;
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

const getTestCases = async (id) => {
    try {
        const questions = await Question.findById(id, 'testCases').toArray();;
        return questions;
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

const getQuestionByIdDB = async (id) => {
    try {
        const question = await Question.findById(id);
        return question;
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

const deleteOneQuestionById = async (id) => {
    try {
        //console.log(assesment);
        const question = await Question.findByIdAndDelete(id);
        console.log(question);
        return question;
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
    addQuestion,
    getQuestions,
    getQuestionByIdDB,
    getTestCases,
    deleteOneQuestionById
}
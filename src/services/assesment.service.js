const mongoose = require('mongoose')
const Assesment = require('../models/assesment')

const addAssesment = async (assesment) => {
    try {
        console.log(assesment);
        const insertedAssesment = await Assesment.create(assesment);
        return insertedAssesment;
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

const findAllAssesmentByUserId = async (examineeId) => {
    try {
        //console.log(assesment);
        const dateArray = new Date().toLocaleDateString("en-Us","Asia/Kolkata").split("/");
        const date = parseInt(dateArray[1]);
        const month = parseInt(dateArray[0]);
        const year = parseInt(dateArray[2]);
        console.log(date);
        console.log(month);
        console.log(year);
        const todaysAssesment = await Assesment.find(
            {
                $and:[
                    {
                    examinees: `${examineeId}`
                    },
                    {
                        "date.date": date
                    },
                    {
                        "date.month": month
                    },
                    {
                        "date.year" : year
                    }
                ]
            }
        );
        console.log(todaysAssesment);
        return todaysAssesment;
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

const findAllAssesments = async () => {
    try {
        //console.log(assesment);
        const allassesments = await Assesment.find().populate("questions").populate("examinees");
        console.log(allassesments);
        return allassesments;
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

const findAssesmentById = async (id) => {
    try {
        //console.log(assesment);
        const assesment = await Assesment.findById(id).populate("questions");
        console.log(assesment);
        return assesment;
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

const deleteOneAssesmentById = async (id) => {
    try {
        //console.log(assesment);
        const assesment = await Assesment.findByIdAndDelete(id);
        console.log(assesment);
        return assesment;
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
    addAssesment,
    findAllAssesments,
    findAllAssesmentByUserId,
    findAssesmentById,
    deleteOneAssesmentById
}
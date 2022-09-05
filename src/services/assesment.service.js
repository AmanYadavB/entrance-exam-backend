const mongoose = require('mongoose')
const Assesment = require('../models/assesment')

const addAssesment = async (assesment) => {
    try {
        
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
        const dateObj = new Date();
        const ISToffSet = 330; 
        offset= ISToffSet*60*1000;
        const ISTTime = new Date(dateObj.getTime()+offset);
        const date = ISTTime.getDate();
        const month = ISTTime.getMonth()+1;
        const year = ISTTime.getFullYear();
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
        
        const allassesments = await Assesment.find().populate("questions").populate("examinees");
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
       
        const assesment = await Assesment.findById(id).populate("questions");
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

const findSampleAssesment = async () => {
    try {
        const assesment = await Assesment.findOne({
            name: 'Sample Exam'
        }).populate("questions");
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
        const assesment = await Assesment.findByIdAndDelete(id);
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
    findSampleAssesment,
    deleteOneAssesmentById
}
const mongoose = require( 'mongoose' );
const User = require("../models/Users");

const addUser = async ( user ) => {
    try {
        const insertedUser = await User.create( user );
        return insertedUser;
    } catch( error ) {
        if( error.name === 'ValidationError' ) {
            const dbError = new Error( `Validation error : ${error.message}` );
            dbError.type = 'ValidationError';
            throw dbError;
        }
        
        if( error.name === 'CastError' ) {
            const dbError = new Error( `Data type error : ${error.message}` );
            dbError.type = 'CastError';
            throw dbError;
        }

        throw error;
    }
};

const getUserByEmail = async ( email ) => {
    const user = await User.findOne({
        email
    });
    if( user === null ) {
        const error = new Error( 'Bad Credentials' );
        error.type = 'BadCredentials';
        throw error;
    }

    return user;
};

const isNotRegistered = async ( email ) => {
    const user = await User.findOne({
        email
    });

    if( user !== null ) {
        const error = new Error( 'Conflict' );
        error.type = 'Conflict';
        throw error;
    }

    return user;
};

const findAllExaminees = async () => {
    const examinees = await User.find({
        role: 'examinee'
    });

    if( examinees === null ) {
        const error = new Error( 'Bad Credentials' );
        error.type = 'BadCredentials';
        throw error;
    }

    return examinees;
};

const checkPassword = async ( user, plainTextPassword ) => {
    let  isMatch;
    
    try {
        isMatch = await user.checkPassword( plainTextPassword );
    } catch( err ) {
        const error = new Error( 'Something went wrong checking credentials' );
        error.type = 'DBError';
        throw error;
    }

    if( !isMatch ) {
        const error = new Error( 'Bad Credentials' );
        error.type = 'BadCredentials';
        throw error;
    }

    return isMatch;
};

module.exports = {
    addUser,
    getUserByEmail,
    checkPassword,
    findAllExaminees,
    isNotRegistered
}
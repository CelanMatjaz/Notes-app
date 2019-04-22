import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerCheck = args => {
    const { email, password, passwordRepeat } = args;
    const errors = [];

    if(!email || !password || !passwordRepeat){
        if(!email) errors.push('Email is missing');
        if(!password) errors.push('Password is missing');        
        if(!passwordRepeat) errors.push('Password repeat is missing');
    }
    else {
        if(password !== passwordRepeat) errors.push('Passwords do not match');
        else if(password < 8) errors.push('Password is too short');
    }

    if(errors.length === 0) 
        return {
            newUser: {
                email
            }
        }
    return {
        errors
    }    
}

export const loginCheck = args => {
    const { email, password } = args;
    const errors = [];

    if(!email || !password){
        if(!email) errors.push('Email is missing');
        if(!password) errors.push('Password is missing');
    }
    else{
        if(password.length < 8) errors.push('Password is too short');
    }

    if(errors.length !== 0) 
        return { errors };
    return {
        errors: null
    }
}

export const checkForToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader.startsWith('Bearer ')){
        const token = authHeader.split(' ')[1];
        if(token){
            req.user = await jwt.verify(token, process.env.SECRET).data;
        }
    }    
    next();
}
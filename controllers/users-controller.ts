import { Request, Response, NextFunction } from "express";
import { Result, ValidationError, validationResult } from 'express-validator';

const User = require('../models/user_schema');

const HttpError = require('../models/http-error');

const getUser = async (req: any, res: Response, next: NextFunction) => {
    const wallet = req.params.wallet
    let user;

    try {
        user = await User.findOne({wallet})
    } catch(err) {
        const error = new HttpError('Fetching users faild...', 500);
        return next(error);
    }

    res.status(200).json({ user: user })
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    if(!errors.isEmpty()){
        return next(
            new HttpError('invalid inputs past please check your data', 422)
        );
    }

    const { username, password, wallet } = req.body;

    let existingUser;
    try{ 
        existingUser = await User.findOne({ username })
    } catch(err) {
        const error = new HttpError('Signing up failed, please try again later..', 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead.',
            422
        )
        return next(error);
    }

    const createdUser = new User({
        username,
        password, 
        wallet
    });

    try {
        await createdUser.save();
    } catch {
        const error = new HttpError(
            'Signing up faild, please try again.',
        )
    }
    
    res.status(201).json({user: createdUser.toObject({ getters: true })});
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    let existingUser;
    try{ 
        existingUser = await User.findOne({ username })
    } catch(err) {
        const error = new HttpError('Logging in failed, please try again later..', 500);
        return next(error);
    }

    if (!existingUser || existingUser.password !== password){
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            401
        );
        return next(error);
    }

    res.json({message: 'Logged in!'});
}

exports.getUser = getUser;
exports.signup = signup;
exports.login = login;

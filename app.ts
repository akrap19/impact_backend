import bodyParser from "body-parser";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

const HttpError = require('./models/http-error');
const express = require('express');
var cors = require('cors');
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use('/api/users', usersRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    throw new HttpError('Could not find this route', 404);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if(res.headersSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unkonown error occurd'});
});

mongoose.connect('mongodb+srv://akrap19:Kojemanga19@impactcluster.sqdcnpd.mongodb.net/users?retryWrites=true&w=majority')
  .then(() => {
    app.listen(4000);
}).catch(err => {
    console.log(err)
});

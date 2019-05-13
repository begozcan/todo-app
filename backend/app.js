import cookieParser from "cookie-parser";
import express from 'express';
import logger from 'morgan';
import path from 'path';
import indexRouter from './routes/index';
import userRouter from './routes/users';

// CORS middleware
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'frontend/build')));
app.use(allowCrossDomain);

app.use('/', indexRouter);
app.use('/api/user', userRouter);

module.exports = app;

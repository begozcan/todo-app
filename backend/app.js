import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import path from 'path';
import indexRouter from './routes/index';
import todoItemRouter from './routes/todo';

// Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/todo-app';
mongoose.connect(mongoDB, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

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
app.use('/api/todo', todoItemRouter);

module.exports = app;

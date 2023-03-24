const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors')
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const categoriesRouter = require('./routes/categories')

const app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI + 'jenny-waller', {
  useUnifiedTopology: true
})
.then (() => {
  console.log('We´re connected to the database!');

})
.catch(err => console.log('err',err));

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/categories', categoriesRouter)

module.exports = app;

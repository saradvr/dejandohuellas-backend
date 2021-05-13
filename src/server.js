require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('./db');
const userRouter = require('./routes/user');
const animalRouter = require('./routes/animal');
const ongRouter = require('./routes/ong');
const transactionRouter = require('./routes/transaction');

const port = process.env.PORT;
const app = express();
connect();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/users', userRouter);
app.use('/ong', ongRouter);
app.use('/animals', animalRouter);
app.use('/transactions', transactionRouter);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

require('dotenv').config();
const express = require('express');
const router = require('./routers');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN.split(','),
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use(errorHandler);

const port = process.env.PORT || 3005;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening on port ${port}`);
  }
});

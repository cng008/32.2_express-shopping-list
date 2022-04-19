const express = require('express');
const itemsRoutes = require('./routes/items');
const ExpressError = require('./expressError');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/items', itemsRoutes); // apply a prefix to every route in itemsRoutes
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// 404 HANDLER
app.use((req, res, next) => {
  return new ExpressError('Not Found', 404);
});

// GENERIC ERROR HANDLER
app.use((error, req, res, next) => {
  // the default status is 500 Internal Server Error
  let status = error.status || 500;
  let message = error.message;
  // set the status and alert the user
  return res.status(status).json({ error: { message, status } });

  // res.status(error.status).send(error.msg) //alt
});
// END GENERIC ERROR HANDLER

module.exports = app;

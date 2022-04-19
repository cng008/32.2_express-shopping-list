const express = require('express');
const itemsRoutes = require('./routes/items');
const ExpressError = require('./expressError');
const app = express();

app.use(express.json());
app.use('/items', itemsRoutes); // apply a prefix to every route in itemsRoutes
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// 404 HANDLER
app.use((req, res, next) => {
  return new ExpressError('Not Found', 404);
});

// GENERIC ERROR HANDLER
app.use((err, req, res, next) => {
  // the default status is 500 Internal Server Error
  res.status(err.status || 500);

  return res.json({
    error: err.message
  });
});
// END GENERIC ERROR HANDLER

module.exports = app;

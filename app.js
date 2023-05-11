require('dotenv').config();
require('express-async-errors');
const express = require('express');
const mainRouter = require('./routes/main');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/v1', mainRouter);
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = () => {
  try {
    app.listen(port, () => {
      console.log('Server is running on port', port);
    });
  } catch (error) {
    console.log(error);
  }
}

start();

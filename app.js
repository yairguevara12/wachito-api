const express = require('express');
const app = express();
const mainRouter = require('./routes/main');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');
app.use(express.json());
app.use('/api/v1',mainRouter);
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);
const port = process.env.PORT || 5000;

const start = ()=>{
   /*  try {
        app.listen(port, ()=>{
            console.log('Server is running on port', port);
        });
    } catch (error) {
        console.log(error);
    } */
    connection.connect((err) => {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
      
        console.log('connected (suscessfully) as id ' + connection.threadId);
      });
}

start();
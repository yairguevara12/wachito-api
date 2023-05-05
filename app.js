const express = require('express');
const app = express();
const mainRouter = require('./routes/main');
app.use(express.json());
app.use('/api/v1',mainRouter);

const port = process.env.PORT || 5000;

const start = ()=>{
    try {
        app.listen(port, ()=>{
            console.log('Server is running on port', port);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
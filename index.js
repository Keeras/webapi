const express = require('express');
const mongoose = require('mongoose');

const heroRouter = require('./routes/heros');
const categoryRouter = require('./routes/category');

const dotenv = require('dotenv').config();
const auth = require('./auth');

const url = 'mongodb://localhost:27017/tohdb'
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));

const PORT = 3000;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true})
.then((db)=>{
    console.log('Succesfully Connected to mongodb server');
},(err)=> console.log(err));


app.use('/users', userRouter);
app.use(auth);
app.use('/heros', heroRouter);
app.use('/categories', categoryRouter);



// app.use(express.static(__dirname + "/public"));

// app.use((err, req, res, next)=>{
//     console.error(err.stack);
//     res.statusCode = 500;

//     res.josn({message: err.message});
// });




app.listen(PORT,()=>{
    console.log(`App is running at localhost:${PORT}`);
});
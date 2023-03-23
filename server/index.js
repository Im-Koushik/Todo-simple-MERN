const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const todoRouter = require('./routes/todoRoute');


const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5500;
const DB = process.env.DB

mongoose.connect(DB).then(() => {
    console.log("DB connected")
}).catch(err => console.log(err))




app.use('/', todoRouter);


app.listen(port, () => {
    console.log('Server running')
})

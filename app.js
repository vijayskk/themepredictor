var express = require('express');

var dotenv = require('dotenv');

var indexRouter = require('./routes/index');

var app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

const port = process.env.PORT ?  process.env.PORT : 3000

app.listen(3000,()=>{
  console.log("App started in 3000");
})


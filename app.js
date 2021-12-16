var express = require('express');

var indexRouter = require('./routes/index');

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);


app.listen(3000,()=>{
  console.log("App started");
})


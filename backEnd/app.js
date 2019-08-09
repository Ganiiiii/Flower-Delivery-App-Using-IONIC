const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const userRoutes = require('../backEnd/api/routes/userRoutes');
const ordersRoutes = require('../backEnd/api/routes/ordersRoutes');
const shopRoutes = require('../backEnd/api/routes/shopRoutes');

mongoose.connect('mongodb+srv://test:' + process.env.MONGO_ATLAS_PW + '@cluster0-zxgny.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use('/user',userRoutes);
app.use('/orders',ordersRoutes);
app.use('/shops',shopRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: { message: error.message } });
  
  });

module.exports=app;
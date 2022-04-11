const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes/');
const helmet = require('helmet');
const logger = require('./src/logger/logger');


dotenv.config();
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(helmet());

mongoose.connect(
    process.env.DB_CONNECT,
    function(error) {
      if (error) {
        logger.error(`${error}`);
      } else {
        logger.info(
            'connected to the database');
      }
    });

app.use('/api/', routes);

const port = process.env.PORT || 5000;

app.listen(port, () => logger.info(`Running at port: ${port}`));
module.exports = app;

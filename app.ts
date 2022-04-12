import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import routes from './src/routes';
import helmet  from "helmet";
import logger from './src/logger/logger';



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

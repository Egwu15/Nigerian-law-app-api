const dotenv = require('dotenv');
const express = require("express");
const mongoose = require('mongoose');
const routes = require("./src/routes/")


dotenv.config();
const app = express();
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.DB_CONNECT, () => console.log("connected to the database"));

app.use('/api/', routes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running at port: ${port}`));
module.exports = app;

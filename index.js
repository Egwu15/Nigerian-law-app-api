const dotenv = require('dotenv');
const express = require("express");

const authRoutes = require("./routes/auth");
const mongoose = require('mongoose');
const lawRoutes = require("./routes/law.route");
const objRoutes = require("./routes/obj.route");
const healthCheck = require("./routes/healthCheck.route");


dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_CONNECT, () => console.log("connected to the database"));
// MIDDLE-WARES

// app.use(express.json);
app.use('/api/users', authRoutes);
app.use('/api/laws', lawRoutes);
app.use('/api/obj', objRoutes);
app.use('/api/test', healthCheck)
//ROUTES


app.listen(process.env.PORT || 5000, () => console.log("waiting"));
const dotenv = require('dotenv');
const express = require("express");

const authRoutes = require("./routes/auth");
const mongoose = require('mongoose');
const lawRoutes = require("./routes/law.route");
const objRoutes = require("./routes/obj.route");


dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_CONNECT, () => console.log("connected to the database"));
// MIDDLE-WARES

// app.use(express.json);
app.use('/api/users', authRoutes);
app.use('/api/laws', lawRoutes);
app.use('/api/obj', objRoutes);
//ROUTES


app.listen(8080, () => console.log("waiting"));
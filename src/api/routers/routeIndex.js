const express = require('express');

const contactRoutes = require('./contact');
const authRoutes = require('./authRoute');

const allRouters = express.Router();

allRouters.use("/contact", contactRoutes);
allRouters.use("/auth", authRoutes);


module.exports =  allRouters;
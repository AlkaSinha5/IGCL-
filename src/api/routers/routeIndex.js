const express = require('express');

const contactRoutes = require('./contact');
const authRoutes = require('./authRoute');
const dummyRoutes = require('./dummyRoute');
const testimonialRoutes = require('./testimonial');
const faqRoutes = require('./faqRoute');

const allRouters = express.Router();

allRouters.use("/contact", contactRoutes);
allRouters.use("/auth", authRoutes);
allRouters.use("/dummy", dummyRoutes);
allRouters.use("/testimonial", testimonialRoutes);
allRouters.use("/faq", faqRoutes);


module.exports =  allRouters;
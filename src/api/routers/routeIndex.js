const express = require('express');

const contactRoutes = require('./contact');
const authRoutes = require('./authRoute');
const dummyRoutes = require('./dummyRoute');
const testimonialRoutes = require('./testimonial');
const faqRoutes = require('./faqRoute');
const clientRoutes = require('./clientRoute');
const policyRoutes = require('./policy');
const abstractRoutes = require('./abstract');
const notificationRoutes = require('./notification');
const judgementRoutes = require('./judgement ');
const kycRoutes = require('./kyc');

const allRouters = express.Router();

allRouters.use("/contact", contactRoutes);
allRouters.use("/auth", authRoutes);
allRouters.use("/dummy", dummyRoutes);
allRouters.use("/testimonial", testimonialRoutes);
allRouters.use("/faq", faqRoutes);
allRouters.use("/client", clientRoutes);
allRouters.use("/policy", policyRoutes);
allRouters.use("/abstract", abstractRoutes);
allRouters.use("/notification", notificationRoutes);
allRouters.use("/judgement", judgementRoutes);
allRouters.use("/kyc", kycRoutes);

module.exports =  allRouters;
const express = require('express');
const app = express();
const cors = require("cors");
const cron = require("node-cron");
const axios = require("axios")

// require('dotenv').config();
// const fileUpload = require("express-fileupload"); 
const path = require('path');
const { connectDB } = require('./db/db');
const allRouters = require('./api/routers/routeIndex');

// Connect to MongoDB
connectDB().catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
});

// app.use(fileUpload({
//     useTempFiles: true
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Uncomment and ensure you have this file if you're using routes

app.use("/v1", allRouters);

// Root route
// app.get('/', (req, res) => {
//     res.send('Welcome to the Express server!');
// });
cron.schedule('*/15 * * * *', async () => {
    try {
      const response = await axios.get('https://igcl.onrender.com/v1/dummy/getDummy');
      console.log("API call successful:", response.data);
    } catch (error) {
      console.error("Error making API call:", error.message);
    }
  });

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

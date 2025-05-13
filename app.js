
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const weatherRoutes = require('./routes/weatherRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB

mongoose.connect("mongodb://localhost:27017/weatherApp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
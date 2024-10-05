const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = require('./routes/router');


dotenv.config();
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI);

app.use('/', router);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

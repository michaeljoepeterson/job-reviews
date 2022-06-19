require('dotenv').config();
const express = require('express');
const { PORT } = require('./config');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser);

app.listen(PORT,() => console.log(`app listening on ${PORT}`));

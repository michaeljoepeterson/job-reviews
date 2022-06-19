require('dotenv').config();
const express = require('express');
const { PORT } = require('./config');
const app = express();
const bodyParser = require('body-parser');
const {router: mainRouter} = require('./routers/main-router');
const { errorHandler } = require('./middleware/error-handler');

app.use(bodyParser.json());
app.use('/api', mainRouter);
app.use(errorHandler);

app.listen(PORT,() => console.log(`app listening on ${PORT}`));

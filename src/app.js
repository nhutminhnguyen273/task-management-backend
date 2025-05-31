const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./infrastructure/database/mongodb');
const cookieParser = require('cookie-parser');
const initializeRoles = require('./infrastructure/init/initializeRoles');
const routes = require('./interfaces/routes/routes');
const errorHandler = require('./infrastructure/middlewares/error-handler');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDb();

initializeRoles()
    .then(() => console.log('Role initialization done'))
    .catch(err => console.error(`Role initialization error: ${err}`));

app.use(routes);

app.use(errorHandler);

module.exports = app;
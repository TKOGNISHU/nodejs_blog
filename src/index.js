const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');

const route = require('./routes');
const db = require('./config/db/index');

// connect to db
db.connect();

const app = express();
const port = 3000;

// middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// set static path
app.use(express.static(path.join(__dirname, 'public')));

// Template engine
app.engine(
    '.hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

// Route path
route(app);

// Listen
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
const app = express()
const port = 3000

// HTTP logger
app.use(morgan('combined'))

// set static path
app.use(express.static(path.join(__dirname, '/public')));

// Template engine
app.engine('.hbs', handlebars.engine({
    extname: '.hbs'
})); 
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '/resource/views'));

// Route
app.get('/', (req, res) => {
    res.render('home');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

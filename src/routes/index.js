const site = require('./site')
const news = require('./news')
const course = require('./course')

function route(app) {
    app.use('/course', course)
    app.use('/news', news)
    app.use('/', site)
}

module.exports = route

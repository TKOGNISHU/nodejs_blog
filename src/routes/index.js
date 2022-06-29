const site = require('./site')
const news = require('./news')
const course = require('./course')
const me = require('./me')

function route(app) {
    app.use('/courses', course)
    app.use('/me', me)
    app.use('/news', news)
    app.use('/', site)
}

module.exports = route

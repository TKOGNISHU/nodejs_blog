const site = require('./site')
const news = require('./news')

function route (app) {

    app.use('/news', news)
    app.use('/', site)
}

module.exports = route;

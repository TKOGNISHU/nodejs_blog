const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/handlebar')

class SiteController {
    // [get] /
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                })
            })
            .catch(next) // err => next(err)
    }

    // [get] /search
    show(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController()

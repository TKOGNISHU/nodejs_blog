const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/handlebar')

class CourseController {
    // [get] /Course/:slub
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                res.render('courses/detail', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next)
    }
}

module.exports = new CourseController()

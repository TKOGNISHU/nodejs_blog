const Course = require('../models/Course')
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/handlebar')

class CourseController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .then((course) =>
                res.render('me/stored-courses', {
                    courses: multipleMongooseToObject(course),
                }),
            )
            .catch(next)
    }
}

module.exports = new CourseController()

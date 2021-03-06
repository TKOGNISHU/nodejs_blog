const Course = require('../models/Course')
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/handlebar')

class CourseController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({})

        if (res.locals._sort.enable) {
            courseQuery = courseQuery.sort({
                [res.locals._sort.column]: res.locals._sort.type,
            })
        }

        Promise.all([Course.countDocumentsDeleted(), courseQuery])
            .then(([count, course]) =>
                res.render('me/stored-courses', {
                    count,
                    courses: multipleMongooseToObject(course),
                }),
            )
            .catch(next)
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((course) =>
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(course),
                }),
            )
            .catch(next)
    }
}

module.exports = new CourseController()

const Course = require('../models/Course')
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/handlebar')

class CourseController {
    // [GET] /Courses/:slub
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                res.render('courses/detail', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next)
    }

    // [GET] /Courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [POST] /Courses/create
    store(req, res, next) {
        const formData = req.body
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`

        const course = new Course(formData)

        course
            .save()
            .then(() => res.redirect('/'))
            .catch((err) => {})
    }

    // [GET] /Courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => {
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                })
            })
            .catch(next)
    }

    // [PUT] /Courses/:id/update
    update(req, res, next) {
        Course.findByIdAndUpdate(req.params.id, req.body)
            .then(res.redirect('/me/stored/courses'))
            .catch(next)
    }
}

module.exports = new CourseController()

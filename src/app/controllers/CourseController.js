const Course = require('../models/Course')
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/handlebar')

// Sort -> GET -> POST -> PUT -> PATCH -> DELETE

class CourseController {
    // [GET] /courses/:slub
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                res.render('courses/detail', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next)
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => {
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                })
            })
            .catch(next)
    }

    // [POST] /courses/create
    store(req, res, next) {
        const formData = req.body
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`

        const course = new Course(formData)

        course
            .save()
            .then(() => res.redirect('/'))
            .catch((err) => {})
    }

    // [POST] //courses/handleAction
    handleAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.checkboxItems } })
                    .then(res.redirect('back'))
                    .catch(next)
                break
            case 'forceDelete':
                Course.deleteMany({ _id: { $in: req.body.checkboxItems } })
                    .then(res.redirect('back'))
                    .catch(next)
                break
            case 'restore':
                Course.restore({ _id: { $in: req.body.checkboxItems } })
                    .then(res.redirect('back'))
                    .catch(next)
                break
            default:
                res.send('Not found: 404')
        }
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.findByIdAndUpdate(req.params.id, req.body)
            .then(res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /courses/:id    (soft delete)
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(res.redirect('back'))
            .catch(next)
    }
}

module.exports = new CourseController()

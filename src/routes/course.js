const express = require('express')
const router = express.Router()

const courseController = require('../app/controllers/CourseController')

// [GET]
router.get('/create', courseController.create)
router.get('/:id/edit', courseController.edit)
router.get('/:slug', courseController.show)

// [POST]
router.post('/store', courseController.store)

// [PUT]
router.put('/:id/update', courseController.update)

module.exports = router

const express = require('express')
const router = express.Router()

const courseController = require('../app/controllers/CourseController')

// [GET]
router.get('/create', courseController.create)
router.get('/:id/edit', courseController.edit)
router.get('/:slug', courseController.show)

// [POST]
router.post('/store', courseController.store)
router.post('/handle-action', courseController.handleAction)

// [PUT]
router.put('/:id', courseController.update)

// PATCH
router.patch('/:id/restore', courseController.restore)

// [DELETE]
router.delete('/:id', courseController.delete)
router.delete('/:id/force', courseController.forceDelete)

module.exports = router

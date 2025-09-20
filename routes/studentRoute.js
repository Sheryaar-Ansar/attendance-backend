const express = require('express')
const router = express.Router()
const { checkin, getAllStudentsAttendance, createStudent } = require('../controllers/studentController')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { authorize } = require('../middlewares/authorize')

router.post('/students', authMiddleware, createStudent)
router.get('/students', authMiddleware, authorize('admin'), getAllStudentsAttendance)
router.post('/checkin/:rollNo', authMiddleware, authorize('admin', 'student'), checkin)

module.exports = router
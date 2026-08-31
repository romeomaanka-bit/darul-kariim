const express = require('express');
const router = express.Router();
const { getTeachers, createTeacher, updateTeacher, deleteTeacher } = require('../controllers/teacherController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getTeachers)
  .post(protect, createTeacher);

router.route('/:id')
  .put(protect, updateTeacher)
  .delete(protect, deleteTeacher);

module.exports = router;

const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.getHomePage);
router.get('/about', indexController.getAboutPage);
router.get('/courses', indexController.getCoursesPage);
router.get('/admissions', indexController.getAdmissionsPage);
router.get('/gallery', indexController.getGalleryPage);
router.get('/contact', indexController.getContactPage);
router.get('/chat', indexController.getChatPage);
router.post('/api/chat', indexController.handleChat);

module.exports = router;

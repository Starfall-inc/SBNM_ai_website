const langchainService = require('../services/langchainService');

exports.getHomePage = (req, res) => {
  res.render('index', { title: 'Home', page: 'home' });
};

exports.getAboutPage = (req, res) => {
  res.render('about', { title: 'About Us', page: 'about' });
};

exports.getCoursesPage = (req, res) => {
  res.render('courses', { title: 'Diploma Courses', page: 'courses' });
};

exports.getAdmissionsPage = (req, res) => {
  res.render('admissions', { title: 'Admissions 2026-27', page: 'admissions' });
};

exports.getGalleryPage = (req, res) => {
  res.render('gallery', { title: 'Campus Gallery', page: 'gallery' });
};

exports.getContactPage = (req, res) => {
  res.render('contact', { title: 'Contact Us', page: 'contact' });
};

exports.getChatPage = (req, res) => {
  res.render('chat', { title: 'Dhanu AI Assistant', page: 'chat' });
};

exports.handleChat = async (req, res) => {
  const { message } = req.body;
  try {
    const response = await langchainService.getChatResponse(message);
    res.json({ response });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
};

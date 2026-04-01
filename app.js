const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

const indexRouter = require('./src/routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout'); // default layout at views/layout.ejs

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);

// Error handling
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`GROQ_API_KEY: ${process.env.GROQ_API_KEY || 'Not Found'}`);
});

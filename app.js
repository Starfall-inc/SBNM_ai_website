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
  console.log(`\n🚀 SBNM Polytechnic Server Started!`);
  console.log(`🔗 Local Address: http://localhost:${PORT}`);
  
  if (process.env.GROQ_API_KEY) {
    console.log(`✅ SBNM AI: Online (Groq Cloud Active)`);
  } else {
    console.log(`⚠️  SBNM AI: Running in Offline Fallback Mode (API Key Missing)`);
    console.log(`👉 Add GROQ_API_KEY to your .env to enable full AI features.`);
  }
  console.log('-------------------------------------------\n');
});

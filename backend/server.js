const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Security & Body Parsing Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Codsiyo badan ayaa ka yimid IP-gan, fadlan sug hadhow.' }
});
app.use('/api/', limiter);

// ==================== API ROUTES ====================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/teachers', require('./routes/teacherRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
// Wadada cusub ee Lacagaha (Fees Route)
app.use('/api/fees', require('./routes/feeRoutes'));

// ==================== FRONTEND STATIC SERVING ====================
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/students.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/students.html'));
});

app.get('/teachers.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/teachers.html'));
});

app.get('/settings.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/settings.html'));
});

// Wadada cusub ee Page-ka Lacagaha (Haddii aad abuurto fees.html)
app.get('/fees.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/fees.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Khalad xagga server-ka ah'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Darul-Kariim server wuxuu ka shaqaynayaa port-ka ${PORT}`);
});
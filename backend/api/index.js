const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

// Xiriirka MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Tusaale Route
app.get('/api/test', (req, res) => {
  res.json({ message: "Darul-Kariim API wuxuu ka shaqaynayaa Vercel!" });
});

// Haddii aad joogto deegaanka local-ka ah (development)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// MUHIM: Vercel waxay u baahan tahay in la soo saaro app-ka
module.exports = app;


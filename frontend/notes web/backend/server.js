const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => console.log('✅ MongoDB connected'));

// Schema & Model
const LinkSchema = new mongoose.Schema({
  class: String,
  subject: String,
  link: String
});
const Link = mongoose.model('Link', LinkSchema);

// GET all links for a class
app.get('/api/links/:class', async (req, res) => {
  const classNum = req.params.class;
  const links = await Link.find({ class: classNum });
  res.json(links);
});

// POST or update a link
app.post('/api/links', async (req, res) => {
  const { class: classNum, subject, link } = req.body;
  const existing = await Link.findOne({ class: classNum, subject });

  if (existing) {
    existing.link = link;
    await existing.save();
    res.json({ message: '✅ Link updated' });
  } else {
    await Link.create({ class: classNum, subject, link });
    res.json({ message: '✅ Link created' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

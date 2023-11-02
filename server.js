// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());

// Define the storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Uploads will be stored in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Serve uploaded files from the 'uploads' folder
app.get('/uploads', (req, res) => {
    const directoryPath = path.join(__dirname, 'uploads');
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.json(files);
      }
    });
  });

// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

// Handle file downloads
app.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const file = path.join(__dirname, 'uploads', filename);

  if (fs.existsSync(file)) {
    res.download(file);
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

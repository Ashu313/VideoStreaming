
const express=require('express');
const multer=require('multer');
const app=express();
const dbConnect=require('../server/database/database');
const uploadVideo = require('./controllers/upload');
const fs = require('fs');
const path=require('path');
const DownloadVideo = require('./controllers/download');
const StreamVideo = require('./controllers/stream');

dbConnect();

const port=3000;
app.use(express.json());

console.log('h1');
const uploadDirectory = './uploads';

if (!fs.existsSync(uploadDirectory)) {
  
  fs.mkdirSync(uploadDirectory);
}
console.log('h2');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50 // 50 MB
  }
});
app.get('/', (req, res) => {
    res.send('Hello, world!');
  });
  

  //1.upload
  //2.stream
  //3.download
app.post('/upload',upload.single('video'),uploadVideo)
app.get('/download/:filename',DownloadVideo);
app.get('/stream/:filename',StreamVideo);

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });



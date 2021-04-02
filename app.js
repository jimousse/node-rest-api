const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// middlewares
const fileUpload = require('./middlewares/file-upload');
const httpHeader = require('./middlewares/http-header');
const errorHandling = require('./middlewares/error');
const reqParser = require('./middlewares/request-parser');

// routes
const feedRouter = require('./routes/feed');
const authRouter = require('./routes/auth');
const statusRouter = require('./routes/status');

// db
const DB_NAME = 'messages';
const mongoDbServer = fs.readFileSync('mongodb_server.txt', 'utf8');
const DB_URL = `${mongoDbServer}/${DB_NAME}`;

// app
const app = express();


app.use(fileUpload);
app.use(reqParser);
app.use(httpHeader);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/feed', feedRouter);
app.use('/auth', authRouter);
app.use(statusRouter);

app.use(errorHandling)



mongoose.connect(DB_URL)
  .then(() => {
    console.log('Connected to database.');
    app.listen(8080);
  })
  .catch(console.log);
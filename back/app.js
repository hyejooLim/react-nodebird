const express = require('express');
const postRouter = require('./routes/post');

const app = express();

// url, method
app.get('/', (req, res) => {
  res.send('Hello express');
});

app.get('/', (req, res) => {
  res.send('Hello api');
});

app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello' },
    { id: 2, content: 'wow' },
    { id: 3, content: 'good' }
  ])
});

app.use('/post', postRouter);

app.listen(3065, () => {
  console.log('server running');
});
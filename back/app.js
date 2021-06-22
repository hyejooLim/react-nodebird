const express = require('express');
const cors = require('cors');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');

// express에 sequelize 등록
db.sequelize.sync()
  .then(() => {
    console.log('db conneted!!');
  })
  .catch(console.error);

passportConfig();
const app = express();

app.use(cors({
  origin: true,
  // credentials: false
}));

// req.body 안에 데이터 넣어줌
app.use(express.json()); // json 형식으로 보낸 경우
app.use(express.urlencoded({ extended: true })); // SubmitForm 으로 보낸 경우

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
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('server running');
});
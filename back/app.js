const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const passportConfig = require('./passport');

// express에 sequelize 등록
db.sequelize.sync()
  .then(() => {
    console.log('db conneted!!');
  })
  .catch(console.error);

dotenv.config();
passportConfig();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}

const app = express();
app.use(morgan('dev'));
app.use(cors({
  origin: ['http://localhost:3060', 'http://52.79.157.220'],
  credentials: true
}));

// req.body 안에 데이터 넣어줌
app.use(express.json()); // json 형식으로 보낸 경우
app.use(express.urlencoded({ extended: true })); // SubmitForm 으로 보낸 경우
app.use('/', express.static(path.join(__dirname, 'uploads')));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET // .env 파일의 값으로 치환되어 저장
}));
app.use(passport.initialize());
app.use(passport.session());

// url, method
app.get('/', (req, res) => {
  res.send('Hello express');
});

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(3065, () => {
  console.log('server running');
});
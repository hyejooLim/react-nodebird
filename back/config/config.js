// npx sequelize init 명령어로 생기는 파일

const dotenv = require('dotenv');

dotenv.config();

// 환경 모드 별로 데이터 베이스를 따로 둠
module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'react-nodebird',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'react-nodebird',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'react-nodebird',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // 로그인한 유저는 다음 작업 진행
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인하지 않은 사용자만 이용 가능합니다.');
  }
};
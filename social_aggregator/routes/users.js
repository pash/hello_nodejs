var express = require('express');
var router = express.Router();

router.use('/', function(req, res, next) {
  if(!req.user) {
    res.redirect('/');
  } else {
    next();
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  // when you are signed in, passport will automatically add this user object to the request object
  res.render('users', {
    user: {
      name: req.user.displayName,
      image: req.user.image
    }
  });
});

module.exports = router;

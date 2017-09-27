var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // when you are signed in, passport will automatically add this user object to the request object
  res.render('users', {
    user: {
      name: req.user.displayName,
      image: req.user._json.image.url
    }
  });
});

module.exports = router;

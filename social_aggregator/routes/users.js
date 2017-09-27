var express = require('express');
var router = express.Router();
var facebook = require('../services/facebook')('478913555829081', 'fa939c94d1b9e76a32b6116de2973776');
var twitter = require('../services/twitter')('dcpvs1O9LBCVvjb0YoTWdgztr', 'uEjiwj3xLblVKYRItpKntibaxge2cMya9fisoqxujXZq0kJGbY');

router.use('/', function(req, res, next) {
  if(!req.user) {
    res.redirect('/');
  } else {
    next();
  }
});

router.use('/', function(req, res, next) {
  if(req.user.twitter) {
    twitter.getTimeLine(req.user.twitter.token, req.user.twitter.tokenSecret, req.user.twitter.id, function(results) {
      req.user.twitter.lastTweet = results[0].text;
      next();
    });
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.user.facebook) {
    facebook.getImage(req.user.facebook.token, function(results) {
      req.user.facebook.image = results.url;
      facebook.getFriends(req.user.facebook.token, function(results) {
        req.user.facebook.friends = results.total_count;
        res.render('users', {user: req.user});
      });
    });
  } else {
    // when you are signed in, passport will automatically add this user object to the request object
    res.render('users', {user: req.user});
  }
});

module.exports = router;

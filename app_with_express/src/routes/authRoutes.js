var express = require('express');
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var authRouter = express.Router();

var router = function(nav) {
  authRouter.route('/signUp')
    .post(function(req, res) {
      console.log(req.body);
      var url = 'mongodb://localhost:27017/libraryApp';
      mongodb.connect(url, function(err, db) {
        var collection = db.collection('users');
        var user = {
          username: req.body.userName,
          password: req.body.password
        };
        collection.insert(user, function(err, results) {
          // passport adds this login function
          // allows us to tell passport that this user is logged in
          req.login(results.ops[0], function() {
            res.redirect('/auth/profile');
          });
        });
      });
    });

  authRouter.route('/signIn')
    .post(passport.authenticate('local', {
      failureRedirect: '/'
    }), function(req, res) {
      res.redirect('/auth/profile');
    });

  authRouter.route('/profile')
    // .all is middleware!
    // next calls the next method which is .get
    .all(function(req, res, next) {
      if (!req.user) {
        res.redirect('/');
      }
      next();
    })
    .get(function(req, res) {
      res.json(req.user);
    });

  return authRouter;
};

module.exports = router;

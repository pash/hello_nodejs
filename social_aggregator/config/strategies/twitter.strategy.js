var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/UserModel');

module.exports = function() {
  passport.use(new TwitterStrategy({
    consumerKey: 'dcpvs1O9LBCVvjb0YoTWdgztr',
    consumerSecret: 'uEjiwj3xLblVKYRItpKntibaxge2cMya9fisoqxujXZq0kJGbY',
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
    passReqToCallback: true},
    function(req, token, tokenSecret, profile, done) {
      var query = {};
      if(req.user) {
        if(req.user.google) {
          console.log('google');
          query = {
            'google.id': req.user.google.id
          };
        } else if (req.user.facebook) {
          console.log('facebook');
          query = {
            'facebook.id': req.user.facebook.id
          };
        }
        User.findOne(query, function(error, user) {
          if (user) {
            user.twitter = {};
            user.twitter.id = profile.id;
            user.twitter.token = token;
            user.twitter.tokenSecret = tokenSecret;

            user.save();
            done(null, user);
          }
        });
      } else {
        query = {
          'twitter.id': profile.id
        };
        User.findOne(query, function(error, user) {
          if (user) {
            console.log('found');
            done(null, user);
          } else {
            console.log('not found');
            user = new User();

            // email not included
            // user.email = profile.emails[0].value;
            user.image = profile.photos[0].value;
            user.displayName = profile.displayName;

            user.twitter = {};
            user.twitter.id = profile.id;
            user.twitter.token = token;
            user.twitter.tokenSecret = tokenSecret;

            user.save();
            done(null, user);
          }
        });
      }
    }
  ));
};

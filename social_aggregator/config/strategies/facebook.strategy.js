var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/UserModel');

module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: '478913555829081',
    clientSecret: 'fa939c94d1b9e76a32b6116de2973776',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    passReqToCallback: true},
    function(req, accessToken, refreshToken, profile, done) {
      var query = {};
      if(req.user) {
        if(req.user.google) {
          console.log('google');
          query = {
            'google.id': req.user.google.id
          };
        } else if (req.user.twitter) {
          console.log('twitter');
          query = {
            'twitter.id': req.user.twitter.id
          };
        }
        User.findOne(query, function(error, user) {
          if (user) {
            user.facebook = {};
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;

            user.save();
            done(null, user);
          }
        });
      } else {
        query = {
          'facebook.id': profile.id
        };
        User.findOne(query, function(error, user) {
          if (user) {
            console.log('found');
            done(null, user);
          } else {
            console.log('not found');
            user = new User();

            // couldn't get this to work unlike in the video
            // console.log(profile);
            // user.email = profile.emails[0].value;
            // image not included; will get later
            // user.image = profile._json.image.url;
            user.displayName = profile.displayName;

            user.facebook = {};
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;

            user.save();
            done(null, user);
          }
        });
      }
    }
  ));
}

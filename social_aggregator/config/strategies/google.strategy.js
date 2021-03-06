var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/UserModel');

module.exports = function() {
  passport.use(new GoogleStrategy({
    clientID: '966824217778-gmtjcbbqme1vl04brnseebv3lkav8haq.apps.googleusercontent.com',
    clientSecret: 'DBsDmyRR9bdrmTpvLyAQ2v0d',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true},
    function(req, accessToken, refreshToken, profile, done) {
      var query = {};
      if(req.user) {
        if(req.user.facebook) {
          console.log('facebook');
          query = {
            'facebook.id': req.user.facebook.id
          };
        } else if (req.user.twitter) {
          console.log('twitter');
          query = {
            'twitter.id': req.user.twitter.id
          };
        }
        User.findOne(query, function(error, user) {
          if (user) {
            user.google = {};
            user.google.id = profile.id;
            user.google.token = accessToken;

            user.save();
            done(null, user);
          }
        });
      } else {
        query = {
          'google.id': profile.id
        };
        User.findOne(query, function(error, user) {
          if (user) {
            console.log('found');
            done(null, user);
          } else {
            console.log('not found');
            user = new User();

            user.email = profile.emails[0].value;
            user.image = profile._json.image.url;
            user.displayName = profile.displayName;

            user.google = {};
            user.google.id = profile.id;
            user.google.token = accessToken;

            user.save();
            done(null, user);
          }
        });
      }
    }
  ));
}

var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function() {
  passport.use(new GoogleStrategy({
    clientID: '966824217778-gmtjcbbqme1vl04brnseebv3lkav8haq.apps.googleusercontent.com',
    clientSecret: 'DBsDmyRR9bdrmTpvLyAQ2v0d',
    callbackURL: 'http://localhost:3000/auth/google/callback'},
    function(req, accessToken, refreshToken, profile, done) {
      var user = {};

      user.email = profile.emails[0].value;;
      user.image = profile._json.image.url;
      user.displayName = profile.displayName;

      user.google = {};
      user.google.id = profile.id;
      user.google.token = accessToken;

      done(null, user);
    }
  ));
}

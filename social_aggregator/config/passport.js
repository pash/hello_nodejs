var passport = require('passport');

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // passport uses to put a user object into the session
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  // passport uses to pull a user object back out of the session
  passport.deserializeUser(function(user, done) {
    done(null, user);
  })

  require('./strategies/google.strategy')();
};

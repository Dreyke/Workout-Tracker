const PassportJWT = require('passport-jwt'),
  ExtractJWT = PassportJWT.ExtractJwt,
  Strategy = PassportJWT.Strategy,
  config = require('./index'),
  models = require('@WorkoutTracker/app/setup')

// instantiate our User model and then get user by matching the JWT token with the token got from the client
module.exports = (passport) => {
  const User = models.User

  const parameters = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
  }

  passport.use(new Strategy(parameters, (payload, done) => {
    User.findOne({ id: payload.id }, (error, user) => {
      if (error) return done(error, false)
      if (user) done(null, user)
      else done(null, false)
    })
  }))
}
const passport = require('passport'),
  config = require('@config'),
  models = require('@WorkoutTracker/app/setup')

module.exports = (app) => {
  const api = app.WorkoutAPI.app.api.user
  app.route('/api/v1/setup')
    .post(api.setup(models.User))
  app.route('/api/v1/users')
    .get(passport.authenticate('jwt', config.session), api.index(models.User, app.get('workoutsecret')))
  app.route('/api/v1/signup')
    .post(api.signup(models.User))
}

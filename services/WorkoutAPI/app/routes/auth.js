// accesses the auth.js file inside the api folder
// sets the default route to send the user to Workout API
// in the /api/v1/auth route, uses the login method, passing the User model as an argument

const models = require('@WorkoutTracker/app/setup')

module.exports = (app) => {
  const api = app.WorkoutAPI.app.api.auth

  app.route('/')
    .get((req, res) => res.send('Workout API'))

  app.route('/api/v1/auth')
    .post(api.login(models.User))
}

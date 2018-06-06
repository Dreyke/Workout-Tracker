// ensures models are loaded before anything else in the application

const mongoose = require('mongoose'),
  UserModel = require('@WorkoutModels/user')

const models = {
  User: mongoose.model('User')
}

module.exports = models

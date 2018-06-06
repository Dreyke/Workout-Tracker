const mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  config = require('@config')

// empty object to store methods
const api = {}

// method that finds a User with a matching username. If username is invalid, throw an error
// else, compare the password and the token that the user is bearing
api.login = (User) => (req, res) => {
  User.findOne({ username: req.body.username }, (error, user) => {
    if (error) throw error

    if (!user) res.status(401).send({ success: false, message: 'Authentication failed. User not found.' })
    else {
      user.comparePassword(req.body.password, (error, matches) => {
        if (matches && !error) {
          const token = jwt.sign({ user }, config.secret)
          res.json({ success: true, message: 'Token granted', token })
        } else {
          res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' })
        }
      })
    }
  })
}

// method to get token and parses it
api.verify = (headers) => {
  if (headers && headers.authorization) {
    const split = headers.authorization.split(' ')

    if (split.length === 2) return split[1]
    else return null
  } else return null
}

module.exports = api

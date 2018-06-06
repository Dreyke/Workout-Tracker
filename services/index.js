require('module-alias/register')
const http = require('http'),
  WorkoutAPI = require('@WorkoutAPI'),
  WorkoutServer = http.Server(WorkoutAPI),
  WorkoutPORT = process.env.PORT || 3000,
  LOCAL = '0.0.0.0'

WorkoutServer.listen(WorkoutPORT, LOCAL, () => console.log(`WorkoutAPI running on ${WorkoutPORT}`))

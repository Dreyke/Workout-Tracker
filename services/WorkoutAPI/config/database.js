// Setting the Mongoose promise library to Promise.

module.exports = (mongoose, config) => {
  const database = mongoose.connection
  mongoose.Promise = Promise

  mongoose.connect(config.database, {
    promiseLibrary: global.Promise
  })

  database.on('error', error => console.log(`Connection to Fitness App database failed: ${error}`))
  database.on('connected', () => console.log('Connected to mLab'))
  database.on('disconnected', () => console.log('Disconnected from mLab'))

  process.on('SIGINT', () => {
    database.close(() => {
      console.log('Web app terminated, connection closed')
      process.exit(0)
    })
  })
}

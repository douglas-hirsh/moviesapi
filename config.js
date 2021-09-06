const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 443
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/moviesapi'
  }
}

module.exports = config

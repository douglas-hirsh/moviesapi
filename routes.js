const Router = require('express').Router
const router = new Router()

const movies = require('./model/movies/router')

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to moviesapi API!' })
})

router.use('/movies', movies)

module.exports = router

const Controller = require('../../lib/controller')
const movieFacade = require('./facade')

class MovieController extends Controller {}

module.exports = new MovieController(movieFacade)

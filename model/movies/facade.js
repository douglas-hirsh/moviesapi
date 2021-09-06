const Facade = require('../../lib/facade')
const moviesSchema = require('./schema')

class MoviesFacade extends Facade {}

module.exports = new MoviesFacade('Movies', moviesSchema)

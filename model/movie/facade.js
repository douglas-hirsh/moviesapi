const Facade = require('../../lib/facade')
const movieSchema = require('./schema')

class MovieFacade extends Facade {}

module.exports = new MovieFacade('Movie', movieSchema)

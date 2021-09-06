class Controller {
  constructor (facade) {
    this.facade = facade
  }

  createQuery (req) {
    return {...req.query, _id: req.params.id};
  }

  create (req, res, next) {
    this.facade.create(req.body)
      .then(doc => res.status(201).json(doc))
      .catch(err => next(err))
  }

  find (req, res, next) {
    console.log(req.createdBy);
    return this.facade.find(req.query)
      .then(collection => res.status(200).json(collection))
      .catch(err => next(err))
  }

  findOne (req, res, next) {
    return this.facade.findOne(this.createQuery(req))
      .then(doc => res.status(200).json(doc))
      .catch(err => next(err))
  }

  findById (req, res, next) {
    return this.facade.findOne(this.createQuery(req))
      .then((doc) => {
        if (!doc) { return res.sendStatus(404) }
        return res.status(200).json(doc)
      })
      .catch(err => next(err))
  }

  update (req, res, next) {
    this.facade.update(this.createQuery(req), req.body)
      .then((results) => {
        if (results.n < 1) { return res.sendStatus(404) }
        if (results.nModified < 1) { return res.sendStatus(304) }
        res.sendStatus(204)
      })
      .catch(err => next(err))
  }

  remove (req, res, next) {
    this.facade.remove(this.createQuery(req))
      .then((doc) => {
        if (!doc) { return res.sendStatus(404) }
        return res.sendStatus(204)
      })
      .catch(err => next(err))
  }
}

module.exports = Controller

const router = require('express').Router();
const { Liability, Device, User } = require('../db').models;

const DEFAULT_LIMIT = 30;

function include(...models) {
  return models.map(model => ({ model, as: model.name.toLowerCase() }));
}

function create(req, res, next) {
  return Liability.create(req.body)
    .then(liability => res.send(liability))
    .catch(err => next(err));
}

function get(req, res, next) {
  const where = { id: req.params.id };

  return Liability.find({ where, include: include(Device, User) })
    .then(liability => res.send(liability))
    .catch(err => next(err));
}

function list(req, res, next) {
  const limit = Number(req.query.limit) || DEFAULT_LIMIT;
  const offset = Number(req.query.offset) || 0;
  const where = req.query;

  return Liability.findAll({ where, limit, offset, include: include(Device, User) })
    .then(liabilities => res.send(liabilities))
    .catch(err => next(err));
}

function remove(req, res, next) {
  const where = { id: req.params.id };

  return Liability.destroy({ where })
    .then(() => res.end())
    .catch(err => next(err));
}

function update(req, res, next) {
  const id = req.params.id;

  return Liability.findById(id)
    .then(liability => liability.update(req.body))
    .then(liability => res.send(liability))
    .catch(err => next(err));
}

router.get('/liability', list);
router.post('/liability', create);
router.get('/liability/:id', get);
router.delete('/liability/:id', remove);
router.put('/liability/:id', update);

module.exports = router;

const router = require('express').Router();
const { User } = require('../db').models;

const DEFAULT_LIMIT = 30;
const attributes = { exclude: ['password'] };

function create(req, res, next) {
  return User.create(req.body)
    .then(user => res.send(user))
    .catch(err => next(err));
}

function get(req, res, next) {
  const where = { id: req.params.id };
  return User.find({ where })
    .then(user => res.send(user))
    .catch(err => next(err));
}

function list(req, res, next) {
  const limit = Number(req.query.limit) || DEFAULT_LIMIT;
  const offset = Number(req.query.offset) || 0;
  const where = req.query;

  return User.findAll({ where, limit, offset, attributes })
    .then(users => res.send(users))
    .catch(err => next(err));
}

function remove(req, res, next) {
  const where = { id: req.params.id };
  return User.destroy({ where })
    .then(() => res.end())
    .catch(err => next(err));
}

function update(req, res, next) {
  const id = req.params.id;
  return User.findById(id)
    .then(user => user.update(req.body))
    .then(user => res.send(user))
    .catch(err => next(err));
}

router.get('/user', list);
router.post('/user', create);
router.get('/user/:id', get);
router.delete('/user/:id', remove);
router.put('/user/:id', update);

module.exports = router;

const router = require('express').Router();
const { Office } = require('../db').models;

const DEFAULT_LIMIT = 30;

function create(req, res, next) {
  return Office.create(req.body)
    .then(office => res.send(office))
    .catch(err => next(err));
}

function get(req, res, next) {
  return Office.findById(req.params.id)
    .then(user => res.send(user))
    .catch(err => next(err));
}

function list(req, res, next) {
  const limit = Number(req.query.limit) || DEFAULT_LIMIT;
  const offset = Number(req.query.offset) || 0;
  const where = req.query;

  return Office.findAll({ where, limit, offset })
    .then(users => res.send(users))
    .catch(err => next(err));
}

function remove(req, res, next) {
  const id = req.params.id;

  const where = { id };
  return Office.destroy({ where })
    .then(() => res.end())
    .catch(err => next(err));
}

function update(req, res, next) {
  const id = req.params.id;

  return Office.findById(id)
    .then(office => office.update(req.body))
    .then(office => res.send(office))
    .catch(err => next(err));
}

router.get('/office', list);
router.post('/office', create);
router.get('/office/:id', get);
router.delete('/office/:id', remove);
router.put('/office/:id', update);

module.exports = router;

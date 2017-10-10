const router = require('express').Router();
const { Device } = require('../db').models;

const DEFAULT_LIMIT = 30;

function create(req, res, next) {
  return Device.create(req.body)
    .then(newDevice => res.send(newDevice))
    .catch(err => next(err));
}

function get(req, res, next) {
  const id = req.params.id;

  return Device.findById(id)
    .then(device => res.send(device))
    .catch(err => next(err));
}

function list(req, res, next) {
  const limit = Number(req.query.limit) || DEFAULT_LIMIT;
  const offset = Number(req.query.offset) || 0;

  return Device.findAll({ limit, offset })
    .then(devices => res.send(devices))
    .catch(err => next(err));
}

function remove(req, res, next) {
  const id = req.params.id;

  const where = { id };
  return Device.destroy({ where })
    .then(() => res.end())
    .catch(err => next(err));
}

function update(req, res, next) {
  const id = req.params.id;

  return Device.findById(id)
    .then(device => device.update(req.body))
    .then(device => res.send(device))
    .catch(err => next(err));
}

router.get('/device', list);
router.post('/device', create);
router.get('/device/:id', get);
router.delete('/device/:id', remove);
router.put('/device/:id', update);

module.exports = router;

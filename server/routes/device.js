const pick = require('lodash/pick');
const router = require('express').Router();
const { Device } = require('../db').models;

const MAX_CNT = 30;
const DEVICE_PROPS = ['cat_num', 'make', 'model', 'os', 'serial'];

function create(req, res) {
  const device = pick(req.body, DEVICE_PROPS);

  return Device.create(device)
    .then(newDevice => res.send(newDevice));
}

function get(req, res) {
  const id = req.params.id;

  return Device.findById(id)
    .then(device => res.send(device));
}

function list(req, res) {
  const limit = Number(req.query.limit) || MAX_CNT;
  const offset = Number(req.query.offset) || 0;

  return Device.findAll({ limit, offset })
    .then(devices => res.send(devices));
}

function remove(req, res) {
  const id = req.params.id;

  return Device.findById(id)
    .then(device => {
      if (!device) {
        return 'NOT FOUND';
      }

      return device.destroy();
    })
    .then(deleted => res.send(deleted));
}

function update(req, res) {
  const id = req.params.id;
  const changes = pick(req.body, DEVICE_PROPS);

  return Device.findById(id)
    .then(device => device.update(changes))
    .then(newDevice => res.send(newDevice));
}

router.get('/', list);
router.post('/', create);
router.get('/:id', get);
router.delete('/:id', remove);
router.put('/:id', update);

module.exports = router;

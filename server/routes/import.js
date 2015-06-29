var express = require('express');
var router = express.Router();
var controller = require('../controllers/import');

router.route('/:source')
  .get(controller('show'))
  .post(controller('update'));

module.exports = router;

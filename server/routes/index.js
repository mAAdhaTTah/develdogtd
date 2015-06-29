var express = require('express');
var router = express.Router();

router.use('/', require('./public'));
router.use('/auth', require('./auth'));
router.use('/app', require('./app'));
router.use('/settings', require('./settings'));
router.use('/api', require('./api'));
router.use('/import', require('./import'));

module.exports = router;

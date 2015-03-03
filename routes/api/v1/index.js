var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  if(!req.user) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  // do we have to check anything about the user here?
  // this is where we attach the user to fetch events
  // scope queries by that

  next();
});

router.use('/actions', require('./actions'));
router.use('/projects', require('./projects'));

module.exports = router;

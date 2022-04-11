const express = require('express');
const router = new express.Router();

router.get('/dev/test', function(req, res) {
  console.log('all working');
  return res.send('all working');
});

module.exports = router;

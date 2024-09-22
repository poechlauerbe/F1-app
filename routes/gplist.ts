const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('page01', {
    title: 'GP List',
    headline: 'Grand Prix List',
    id: 'gplist',
    script: 'javascript/gplist.js'
  });
});

module.exports = router;

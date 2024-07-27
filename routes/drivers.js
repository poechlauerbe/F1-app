const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('page01', {
    title: 'Drivers',
    headline: 'Drivers',
    id: 'drivers',
    script: 'javascript/drivers.js'
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('page01', {
    title: 'Drivers',
    headline: 'Drivers',
    id: 'drivers',
    preScript: '',
    script: 'javascript/drivers.js'
  });
});

module.exports = router;

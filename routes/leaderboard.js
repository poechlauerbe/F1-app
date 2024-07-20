const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('page01', {
    title: 'Race Leaderboard',
    headline: 'Race Leaderboard',
    id: 'positions',
    script: 'javascript/leaderboard.js',
  });
});

module.exports = router;

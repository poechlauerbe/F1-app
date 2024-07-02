const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('leaderboard', { title: 'Race Leaderboard', headline: 'Race Leaderboard'});
});

module.exports = router;

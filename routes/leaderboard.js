const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('leaderboard', { title: 'Race Leaderboard', message: 'Welcome to the home page!'});
});

module.exports = router;

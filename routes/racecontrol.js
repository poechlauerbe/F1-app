const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('racecontrol', { title: 'RaceControl', message: 'Welcome to the home page!'});
});

module.exports = router;

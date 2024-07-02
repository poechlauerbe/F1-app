const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('teamradio', { title: 'Team radio', message: 'Welcome to the home page!'});
});

module.exports = router;

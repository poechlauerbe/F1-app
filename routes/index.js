const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', { title: 'Home', message: 'Welcome to the home page!'});
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('training', { title: 'Training', headline: 'Training', script: 'javascript/training.js'});
});

module.exports = router;

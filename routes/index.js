const router = require('express').Router();

router.get('/', (req, res) => {res.send('Hello');});

router.use('/users', require('./users'));

module.exports = router; 
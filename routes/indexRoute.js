const router = require('express').Router();

router.use('/', require('./swaggerRoute'));

//router.get('/', (req, res) => {res.send('Hello');});

router.get('/', (req, res) => {
res.send('Hello');
});

router.use('/users', require('./usersRoute'));

module.exports = router; 
const { validateLogin, validateRegister } = require('../middleware/validateLogin');
const { register, login } = require('../controllers/user.controller');

const router = require('express').Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

module.exports = router;

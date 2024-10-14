const express = require('express');
const { registerUser, signInUser} = require('../controllers/auth.controller');
const router = express.Router();

//rota de cadastro
router.post('/signup', registerUser);

//rota de login
router.post('/signin', signInUser);

module.exports = router;
const express = require('express');
const { registerUser, signInUser, verifyUser, resendEmail } = require('../controllers/auth.controller');
const router = express.Router();

//rota de cadastro
router.post('/signup', registerUser);

//rota de login
router.post('/signin', signInUser);

//Verificação de email
router.get('/verify/:token', verifyUser)

//reenvio de email
router.post('/resend-email', resendEmail)

module.exports = router;
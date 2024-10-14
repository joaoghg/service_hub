const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')

//rota para verificar validade do token
router.get('/verifytoken', authMiddleware, (req, res) => {
    res.sendStatus(200)
});

module.exports = router;
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')

//rota para verificar validade do token
router.get('/verifytoken', authMiddleware, (req, res) => {

    const user = req.user

    res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email
    })
});

module.exports = router;
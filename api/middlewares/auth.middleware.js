const jwt = require('jsonwebtoken');
require('dotenv').config()

// Middleware de autenticação
function authMiddleware(req, res, next) {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' })
    }

    try {
        const tokenLimpo = token.replace('Bearer ', '')
        const secretKey = process.env.JWT_SECRET

        const decoded = jwt.verify(tokenLimpo, secretKey)
        req.usuario = decoded

        next()
    } catch (error) {
        return res.status(401).json({ mensagem: 'Token inválido.' })
    }
}

module.exports = authMiddleware;

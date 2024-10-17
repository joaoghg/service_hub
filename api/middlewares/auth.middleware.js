const db = require('../config/db')
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Middleware de autenticação
async function authMiddleware(req, res, next) {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' })
    }

    try {
        const tokenLimpo = token.replace('Bearer ', '')
        const secretKey = process.env.JWT_SECRET

        const decoded = jwt.verify(tokenLimpo, secretKey)
        req.usuario = decoded

        const user = await db('users').where('id', req.usuario.id).first()
        if(!user){
            throw new error()
        }

        next()
    } catch (error) {
        return res.status(401).json({ mensagem: 'Token inválido.' })
    }
}

module.exports = authMiddleware;

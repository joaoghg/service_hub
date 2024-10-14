const db = require('../config/db')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer")
const crypto = require('crypto')
const { apiHost } = require('../config/host')

const sendVerificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: "serviceHub.com",
        to: email,
        subject: "Verificação de Email",
        text: `Por favor, clique no link abaixo para verificar seu email : ${apiHost}/verify/${verificationToken}`
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log("Erro enviando o email de verificação", error)
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password, cellphone, cpf, cnpj, type } = req.body;

        if (!name || !email || !password || !cellphone || !type || (!cpf && !cnpj)) {
            return res.status(400).send({ message: 'Parametros faltando' })
        }

        const userExists = await db('users').where('email', email).first()
        if (userExists) {
            return res.status(400).send({ message: 'Email já cadastrado' });
        }

        const verificationToken = crypto.randomBytes(20).toString("hex")

        await db('users').insert({
            name: name,
            email: email.toLowerCase(),
            password: await bcrypt.hash(password, 15),
            cellphone: cellphone,
            cpf: cpf,
            cnpj: cnpj,
            verificationToken: verificationToken,
            type: type 
        });

        sendVerificationEmail(email, verificationToken)
        return res.status(201).send({ message: 'Cadastro concluído', verificationToken });
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Erro ao cadastrar usuário' });
    }
}

const verifyUser = async (req, res) => {
    try {
        const token = req.params.token

        const user = await db('users').where('verificationToken', token).first()
        if (!user) {
            return res.status(400).json({ message: "Token inválido" })
        }

        await db('users')
            .where('id', user.id)
            .update({ verified: true, verificationToken: null })

        res.status(200).json({ message: "Email verificado com sucesso" })
    } catch (error) {
        res.status(500).json({ message: "Verificação do email falhou" })
    }
}

const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: 'Parametros faltando' })
        }

        const user = await db('users').where('email', email).first()
        if (!user) {
            return res.status(401).json({ message: 'Email ou senha incorretos' })
        }

        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid) {
            return res.status(401).json({ message: 'Email ou senha incorretos' })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: token,
            verificationToken: user.verificationToken,
            verified: user.verified
        })
    } catch (err) {
        return res.status(500).send({ message: 'Não foi possível fazer login' });
    }
}

const resendEmail = async (req, res) => {
    try {
        const { email, verificationToken } = req.body;

        if (!email || !verificationToken) {
            return res.status(400).send({ message: 'Parametros faltando' })
        }

        sendVerificationEmail(email, verificationToken)
        return res.status(200).send({ message: 'Email reenviado' });
    } catch (err) {
        return res.status(500).send({ message: 'Não foi possível reenviar o email' });
    }
}

module.exports = {
    registerUser,
    signInUser,
    verifyUser,
    resendEmail
}
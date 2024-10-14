const db = require('../config/db')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer")

const registerUser = async (req, res) => {
    try {
        const { name, email, password, cellphone, cpf, cnpj } = req.body;

        if(!name || !email || !password || !cellphone || (!cpf && !cnpj)){
            return res.status(400).send({ message: 'Parametros faltando' })
        }

        const userExists = await db.User.findOne({
            where: { email }
        });
        if (userExists) {
            return res.status(400).send({message: 'Email já cadastrado'});
        }

        await db.User.create({
            name,
            email,
            password: await bcrypt.hash(password, 15),
            cellphone,
            cpf,
            cnpj
        });
        return res.status(200).send({ message: 'Cadastro concluído' });
    } catch (err) {
        return res.status(500).send({ message: 'Erro ao cadastrar usuário' });
    }
}

const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).send({message: 'Parametros faltando'})
        }

        const user = await db.User.findOne({
            where: { email }
        });
        if (!user) {
            return res.status(400).json('Email ou senha incorretos');
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).json('Email ou senha incorretos');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: token,
        });
    } catch (err) {
        return res.status(500).send({ message: 'Não foi possível fazer login' });
    }
}

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
        text: `Por favor, clique no link abaixo para verificar seu email : https://shopall-fgr8.onrender.com/verify/${verificationToken}`
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log("Erro enviando o email de verificação", error)
    }
}

module.exports = {
    registerUser,
    signInUser
}
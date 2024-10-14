const db = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, cellphone, cpf, cnpj } = req.body;
        
        const userExists = await db.User.findOne({
            where: {email}
        });
        if (userExists) {
            return res.status(400).send('Esse email já foi cadastrado');
        }

        await db.User.create({
            name,
            email,
            password: await bcrypt.hash(password, 15),
            cellphone,
            cpf,
            cnpj
        });
        return res.status(200).send('Cadastro concluído');
    } catch (err) {
        return res.status(500).send('Erro ao cadastrar usuário');
    }
}

const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.User.findOne({
            where: {email}
        });
        if (!user) {
            return res.status(404).json('Email ou senha incorretos');
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(404).json('Email ou senha incorretos');
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
        return res.status(500).send('Não foi possível fazer login');
    }
}

module.exports = {
    registerUser,
    signInUser
}
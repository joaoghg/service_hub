const db = require('../config/db')
const bcrypt = require('bcryptjs');
require('dotenv').config()

const createUserMaster = async () => {
    const user = await db('users').where('email', 'servicehub@gmail.com').first()
    if(user){
        return false
    }

    await db('users').insert({
        name: 'controle',
        email: 'servicehub@gmail.com',
        password: await bcrypt.hash(process.env.MASTERPASSWORD, 15),
        cellphone: '(14)99875-7948',
        gender: 'M',
        cpf: '00000000000',
        cnpj: null,
        verificationToken: null,
        verified: true,
        type: 'C',
        master: true 
    });
}

module.exports = {
    createUserMaster
}
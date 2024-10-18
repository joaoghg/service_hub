const express = require('express')
const cors = require('cors')
const db = require("./config/db")
const path = require('path');
const { createUserMaster } = require('./seeders/user.seed')
const { insertServices } = require('./seeders/services.seed')

const dotenv = require('dotenv')
dotenv.config()

//Criando tabelas no banco
db.migrate.latest()
    .then(() => { //Inserindo dados iniciais
        createUserMaster()
        insertServices()
    })

//Iniciando api
const port = process.env.PORT
const app = express()

const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')

app.use(express.json())
app.use(cors())
app.use('/api', authRoute)
app.use('/api', userRoute)

app.use('/images', express.static(path.join(__dirname, './resources/images')));

app.listen(port, erro => {
    if (erro) {
        process.exit(1)
    }
    console.log(`Api rodando na porta ${port}`)
})
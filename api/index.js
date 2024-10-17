const express = require('express')
const cors = require('cors')
const db = require("./config/db")
const { createUserMaster } = require('./seeders/user.seed')

const dotenv = require('dotenv')
dotenv.config()

//Criando tabelas no banco
db.migrate.latest()
    .then(() => { //Inserindo dados iniciais
        createUserMaster()
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

app.listen(port, erro => {
    if (erro) {
        process.exit(1)
    }
    console.log(`Api rodando na porta ${port}`)
})
const express = require('express')
const cors = require('cors')
const db = require("./config/db")

const dotenv = require('dotenv')
dotenv.config()

db.migrate.latest()

const port = process.env.PORT
const app = express()

const authRoute = require('./routes/auth.route')

app.use(express.json())
app.use(cors())
app.use('/api', authRoute)

app.listen(port, erro => {
    if (erro) {
        process.exit(1)
    }
    console.log(`Api rodando na porta ${port}`)
})
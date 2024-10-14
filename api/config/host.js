require('dotenv').config();

const apiHost = `http://localhost:${process.env.PORT}/api`

module.exports = {
    apiHost
}
const db = require('../config/db')
const services = require('../resources/data/services')

const insertServices = async () => {
    console.log(services)
}

module.exports = {
    insertServices
}
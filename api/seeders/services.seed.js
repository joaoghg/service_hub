const db = require('../config/db')
const services = require('../resources/data/services')

const insertServices = async () => {
    const qtd = await db('services').count('id').first()
    if(qtd.count > 0){
        return false
    }
    
    services.map(async (item, i) => {
        const service = await db('services').returning('id').insert({
            name: item.servico
        });

        const id = service[0].id

        await db('service_images').insert({
            service_id: id,
            path: item.imagem,
            main: true
        })

    })
}

module.exports = {
    insertServices
}
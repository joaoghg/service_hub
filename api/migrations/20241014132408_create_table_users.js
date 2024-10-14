/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.integer('type').notNullable() //1 - Cliente; 2 - Prestador
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.string('cellphone').notNullable()
    table.string('cpf')
    table.string('cnpj')
    table.boolean('verified').notNullable().defaultTo(false)
    table.string('verificationToken')
    table.dateTime('createdAt').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users')
};

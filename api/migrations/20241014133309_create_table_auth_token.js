/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('auth_token', table => {
        table.increments('id').primary()
        table.integer('user_id').unsigned().notNullable()
        table.string('token').notNullable()
        table.string('email').notNullable()
        table.foreign('user_id').references('users.id')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('auth_token')
};

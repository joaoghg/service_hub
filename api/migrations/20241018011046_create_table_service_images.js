/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('service_images', table => {
        table.increments('id').primary()
        table.integer('service_id').notNullable().unsigned()
        table.string('path').notNullable()
        table.foreign('service_id').references('services.id')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('service_images')
};

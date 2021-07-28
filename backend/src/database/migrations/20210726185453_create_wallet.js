exports.up = function(knex) {
    return knex.schema.createTable('wallet', function(table){
        table.integer('id').primary();
        table.string('description').notNullable();
        table.double('value').notNullable();
        table.integer('owner').notNullable();
        table.integer('type').notNullable();

        table.foreign('owner').references('id').inTable('users');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('wallet');
};
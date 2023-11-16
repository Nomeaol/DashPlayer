import {
    createAtTimestampTrigger,
    toTrimLowerCaseTrigger,
    updateAtTimestampTrigger,
} from './util/util.js';

export async function up(knex) {
    return knex.schema
        .createTable('dp_word_level', (table) => {
            table.increments('id').primary();
            table.string('word').notNullable();
            table.string('stem').nullable();
            table.string('translate').nullable();
            table.string('note').nullable();
            // create_at and update_at
            table.timestamps(true, false);
            table.unique(['word']);
        })
        .then(() => {
            return knex.raw(createAtTimestampTrigger('dp_word_level'));
        })
        .then(() => {
            return knex.raw(updateAtTimestampTrigger('dp_word_level'));
        })
        .then(() => {
            return knex.raw(toTrimLowerCaseTrigger('dp_word_level', 'word'));
        });
}

export async function down(knex) {
    return knex.schema.dropTable('dp_word_level');
}

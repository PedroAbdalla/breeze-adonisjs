'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
    up() {
        this.create('projects', (table) => {
            table.increments()
            table
                .integer('user_id')
                .unsigned()
                .references('id') //chave estrangeira
                .inTable('users') //tabela da chave
                .onUpdate('CASCADE')
                .onDelete('SET NULL')
            table.string('title').notNullable()
            table.text('description').notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('projects')
    }
}

module.exports = ProjectSchema

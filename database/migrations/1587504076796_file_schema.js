'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileSchema extends Schema {
    up() {
        this.create('files', (table) => {
            table.increments()
            table.string('file').notNullable()
            table.string('name').notNullable()
            table.string('type', 80).notNullable()
            table.string('subtype', 80).notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('files')
    }
}

module.exports = FileSchema

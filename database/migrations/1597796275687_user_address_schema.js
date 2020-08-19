'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAddressSchema extends Schema {
    up () {
        this.create('user_addresses', (table) => {
            table.increments()
            table
                .integer('user_id')
                .unsigned()
                .references('id') //chave estrangeira
                .inTable('users') //tabela da chave
                .onUpdate('CASCADE')
                .onDelete('SET NULL')
            table.timestamps()
            table.string('street').notNullable()
            table.integer('number').notNullable()
            table.string('district')
            table.string('city').notNullable()
            table.string('state').notNullable()
        })
    }

    down () {
        this.drop('user_addresses')
    }
}

module.exports = UserAddressSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersNewColoumnSchema extends Schema {
    up() {
        this.table('users', (table) => {
            table.timestamp('token_time')
        })
    }
}

module.exports = UsersNewColoumnSchema

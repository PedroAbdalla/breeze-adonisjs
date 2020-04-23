'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
    project () {
        return this.belongsTo('App/Models/Project') // o projeto pertene a um usuario
    }
    user () {
        return this.belongsTo('App/Models/User') // o projeto possui varias tarefas
    }
    file () {
        return this.belongsTo('App/Models/File') // o projeto possui varias tarefas
    }
}

module.exports = Task

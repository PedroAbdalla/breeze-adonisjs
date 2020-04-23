'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
    user () {
        return this.belongsTo('App/Models/User') // o projeto pertene a um usuario
    }
    task () {
        return this.hasMany('App/Models/Task') // o projeto possui varias tarefas
    }
}

module.exports = Project

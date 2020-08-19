'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
    // esse metodo funciona com contrucor
    static boot () {
        super.boot()
        //chamo o metodo sempre antes de salvar
        this.addHook('afterCreate', 'TaskHook.sendNewTaskMail')
        this.addHook('beforeUpdate', 'TaskHook.sendNewTaskMail')
    }
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

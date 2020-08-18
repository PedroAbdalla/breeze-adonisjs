'use strict'

class Project {
    get validateAll () {
        return true
    }
    get rules () {
        return {
            // validation rules
            title: 'required',
            description: 'required'
        }
    }
}

module.exports = Project

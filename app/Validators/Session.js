'use strict'

class Session {
    get validateAll () {
        return true
    }
    get rules () {
        return {
        // validation rules
            email: 'required|email',
            password: 'required'
        }
    }
}

module.exports = Session

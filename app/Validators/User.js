'use strict'

class User {
    //verifica todos os campos antes do retorno
    get validateAll () {
        return true
    }
    get rules() {
        return {
            // validation rules
            username: 'required|unique:users',
            email: 'required|email|unique:users',
            password: 'required|confirmed'
        }
    }
}

module.exports = User

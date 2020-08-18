'use strict'

const User = use('App/Models/User')

class UserController {
    async store({ request }) {
        //pega os valores enviados por post
        const data = request.only(['username', 'email', 'password'])
        //cria um novo usuario
        const user = await User.create(data)
        return user
    }
}

module.exports = UserController

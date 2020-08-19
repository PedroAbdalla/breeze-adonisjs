'use strict'

const User = use('App/Models/User')
const Database = use('Database')
class UserController {
    async store({ request }) {
        //pega os valores enviados por post
        const data = request.only(['username', 'email', 'password'])
        const addresses = request.input('addresses')

        // beginTransaction garante q todas as operações deram certo
        const trx = await Database.beginTransaction()

        //cria um novo usuario
        const user = await User.create(data, trx)
        await user.addresses().createMany(addresses, trx)

        await trx.commit()

        return user
    }
}

module.exports = UserController

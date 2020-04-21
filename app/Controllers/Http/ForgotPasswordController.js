'use strict'
const moment = require('moment')
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')
class ForgotPasswordController {
    async store ({ request, response }) {
        try {
            const  email = request.input('email') // input pra buscar um unico campo
            const user = await User.findByOrFail('email', email) // findbby encontra um unico usuario
            user.token = crypto.randomBytes(10).toLocaleString('hex')
            user.token_time = new Date()
            await user.save()
            await Mail.send(
                ['emails.forgot_password'], //template
                {
                    email,
                    token: user.token,
                    link: `${request.input('redirect_url')}?token=${user.token}`
                }, //parametros do template
                message => {
                    message
                    .to(user.email)
                    .from('pedroabdalla@outlook.com', 'Pedro | SonhoReal')
                    .subject('Recuperação de senha')
                }
            )

        } catch (err) {
            return response.status(err.status).send({error: 'Algo não deu certo'})
        }
    }
    async update ({request, response}) {
        try {
            const { token, password } = request.all()
            const user = await User.findByOrFail('token', token) // findbby encontra um unico usuario
            const tokenExpired = moment().subtract(2, 'd').isAfter(user.token_time)
            
            if(tokenExpired) {
                return response.status(401).send({error: 'Token expirado.'})
            }
            
            user.token = null
            user.token_time = null
            user.password = password
            await user.save()
        } catch (err) {
            return response.status(err.status).send({error: 'Nao foi possível resetar sua senha.'})
        }
    }
}


module.exports = ForgotPasswordController

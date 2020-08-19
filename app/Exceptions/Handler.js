'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Env = use('Env')
const Youch = use('Youch')
const Raven = require('raven')
const Config = require('Config')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
    /**
     * Handle exception thrown during the HTTP lifecycle
     *
     * @method handle
     *
     * @param  {Object} error
     * @param  {Object} options.request
     * @param  {Object} options.response
     *
     * @return {void}
     */
    async handle(error, { request, response }) {
        //se for erro de validação retorna a mensagem do erro
        if(error.name === 'ValidationException') {
            return response.status(error.status).send(error.messages)
        }
        //caso estaja no dev envia o erro de forma detalhada
        if (Env.get('NODE_ENV') === 'development') {
            const youch = new Youch(error, request.request)
            const errorJson = await youch.toJSON()
            return response.status(error.status).send(errorJson)
        }
        return response.status(error.status)
    }

    /**
     * Report exception for logging or debugging.
     *
     * @method report
     *
     * @param  {Object} error
     * @param  {Object} options.request
     *
     * @return {void}
     */
    async report(error) {
        Raven.config(Config.get('services.sentry.dsn'))
        Raven.captureException(error)
    }
}

module.exports = ExceptionHandler

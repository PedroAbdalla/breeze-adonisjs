'use strict'

const Env = use('Env')

module.exports = {
    sentry: {
        dsm: Env.get('SENTRY_DSN')
    }
}
'use strict'

class ForgotPassowrd {
    get validateAll () {
        return true
    }
    get rules () {
        return {
            // validation rules
            email: 'required|email',
            redirect_url: 'required|url'
        }
    }
}

module.exports = ForgotPassowrd

'use strict'

const Route = use('Route')

//post
Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')
Route.post('passwords', 'ForgotPasswordController.store')
Route.post('files', 'FileController.store')

//put
Route.put('update', 'ForgotPasswordController.update')
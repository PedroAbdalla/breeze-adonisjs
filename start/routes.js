'use strict'

const Route = use('Route')

//post
Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')
Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassowrd')
Route.post('files', 'FileController.store')

//put
Route.put('update', 'ForgotPasswordController.update').validator('ResetPassowrd')

//get

// rotas autenticadas
Route.group(() => {
    //get
    Route.get('files/:id', 'FileController.show')
    //crud
    Route.resource('projects', 'ProjectController').apiOnly().validator(new Map(
        [
            [
                ['projects.store'],
                ['Project']
            ]
        ]
    ) )
    Route.resource('projects.tasks', 'TaskController').apiOnly().validator(new Map(
        [
            [
                ['projects.tasks.store'],
                ['Task']
            ]
        ]
    ) )

}).middleware(['auth'])
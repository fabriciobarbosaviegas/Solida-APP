/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UsersController from '../app/controllers/users_controller.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.get('/:id', [UsersController, 'getUserById'])
  router.post('/', [UsersController, 'createUser'])
  router.put('/:id', [UsersController, 'updateUser'])
  router.delete('/:id', [UsersController, 'deleteUser'])
}).prefix("user")
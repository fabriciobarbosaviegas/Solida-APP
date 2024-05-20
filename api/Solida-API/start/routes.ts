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
import ReportsController from '../app/controllers/reports_controller.js'
import VolunteersController from '../app/controllers/volunteers_controller.js'
import AuthController from '../app/controllers/auth_controller.js'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('login/', [AuthController, 'login'])
router.post('user/', [UsersController, 'createUser'])
router.group(() => {
  router.get('/:id', [UsersController, 'getUserById'])
  router.put('/:id', [UsersController, 'updateUser'])
  router.delete('/:id', [UsersController, 'deleteUser'])
}).prefix("user").use(middleware.auth({
  guards: ['api']
}))

router.group(() => {
  router.post('/', [VolunteersController, 'createVolunteer'])
  router.delete('/:userId/:reportId', [VolunteersController, 'deleteVolunteer'])
  router.delete('/:id', [VolunteersController, 'deleteVolunteerById'])

}).prefix("volunteer").use(middleware.auth({
  guards: ['api']
}))

router.group(() => {
  router.get('/', [ReportsController, 'getAllReports'])
  router.get('/:id', [ReportsController, 'getReportById'])
  router.post('/', [ReportsController, 'createReport'])
  router.put('/:id', [ReportsController, 'updateReport'])
  router.delete('/:id', [ReportsController, 'deleteReport'])
}).prefix("report")
.use(middleware.auth({
  guards: ['api']
}))
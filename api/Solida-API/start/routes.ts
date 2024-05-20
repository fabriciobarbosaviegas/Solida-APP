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

router.group(() => {
  router.post('/', [VolunteersController, 'createVolunteer'])
  router.delete('/:userId/:reportId', [VolunteersController, 'deleteVolunteer'])
  router.delete('/:id', [VolunteersController, 'deleteVolunteerById'])

}).prefix("volunteer")

router.group(() => {
  router.get('/', [ReportsController, 'getAllReports'])
  router.get('/:id', [ReportsController, 'getReportById'])
  router.post('/', [ReportsController, 'createReport'])
  router.put('/:id', [ReportsController, 'updateReport'])
  router.delete('/:id', [ReportsController, 'deleteReport'])
}).prefix("report")
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
// eslint-disable-next-line @adonisjs/prefer-lazy-controller-import
import UsersController from '#controllers/users_controller'
// eslint-disable-next-line @adonisjs/prefer-lazy-controller-import
import ProjectsController from '#controllers/projects_controller'
router.on('/').renderInertia('home', { version: 6 })

router.post('/users', [UsersController, 'store'])
router.get('/users/:id', [UsersController, 'show'])
router.get('/users', [UsersController, 'index'])
router.put('/users/:id', [UsersController, 'update'])
router.get('/users/:id/projects', [UsersController, 'getUserProjects'])

router.get('/projects', [ProjectsController, 'index'])
router.post('/projects', [ProjectsController, 'store'])
router.get('/projects/:id', [ProjectsController, 'show'])
router.put('/projects/:id', [ProjectsController, 'update'])
router.post('/projects/:id/team', [ProjectsController, 'addUsersToProject'])
router.get('/projects/:id/team', [ProjectsController, 'getProjectUsers'])

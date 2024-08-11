// import { test } from '@japa/runner'
// import testUtils from '@adonisjs/core/services/test_utils'
// test.group('Users user', (group) => {
//   group.each.setup(() => testUtils.db().withGlobalTransaction())
//   test('create a new user', async ({ client }) => {
//     const response = await client.post('/users').json({
//       firstName: 'test',
//       lastName: 'test',
//       email: 'test@test.test',
//     })

//     response.assertStatus(201)
//     response.assertBodyContains({
//       message: 'User created successfully',
//       data: {
//         firstName: 'test',
//         lastName: 'test',
//         email: 'test@test.test',
//         id: 1,
//         createdAt: response.body().data.createdAt,
//         updatedAt: response.body().data.updatedAt,
//       },
//     })
//   })
//   test('get all users', async ({ assert, client }) => {
//     await client.post('/users').json({
//       firstName: 'test',
//       lastName: 'test',
//       email: 'test@test.test',
//     })
//     const response = await client.get('/users')
//     response.assertStatus(200)
//     const body = response.body()
//     response.assertBodyContains({
//       data: [
//         {
//           firstName: 'test',
//           lastName: 'test',
//           email: 'test@test.test',
//           id: 1,
//         },
//       ],
//     })
//     assert.exists(body.data[0].createdAt)
//     assert.exists(body.data[0].updatedAt)
//   })
//   test('get a user', async ({ assert, client }) => {
//     await client.post('/users').json({
//       firstName: 'test',
//       lastName: 'test',
//       email: 'test@test.test',
//     })
//     const response = await client.get('/users/1')
//     response.assertStatus(200)
//     response.assertBodyContains({
//       data: {
//         firstName: 'test',
//         lastName: 'test',
//         email: 'test@test.test',
//         id: 1,
//       },
//     })
//   })
//   test('update a user', async ({ assert, client }) => {
//     await client.post('/users').json({
//       firstName: 'test',
//       lastName: 'test',
//       email: 'test@test.test',
//     })
//     const response = await client.put('/users/1').json({
//       firstName: 'test2',
//       lastName: 'test2',
//       email: 'test2@test.test',
//     })
//     response.assertStatus(200)
//     response.assertBodyContains({
//       data: {
//         firstName: 'test2',
//         lastName: 'test2',
//         email: 'test2@test.test',
//         id: 1,
//       },
//     })
//   })
//   test('get user projects', async ({ assert, client }) => {
//     await client.post('/users').json({
//       firstName: 'test',
//       lastName: 'test',
//       email: 'test@test.test',
//     })
//     await client.post('/projects').json({
//       name: 'test',
//       description: 'test',
//     })
//     await client.post('/projects/1/team').json({
//       users: [1],
//       roles: ['test'],
//     })
//     const response = await client.get('/users/1/projects')
//     response.assertStatus(200)
//     assert.exists(response.body().data.test, 'Data field should exist')
//   })
// })

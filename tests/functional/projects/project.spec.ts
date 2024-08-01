import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
test.group('Projects project', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('create project', async ({ client }) => {
    const response = await client.post('/projects').json({
      name: 'test',
      description: 'test',
    })
    response.assertStatus(201)
    response.assertBodyContains({
      data: {
        name: 'test',
        description: 'test',
        id: 1,
        createdAt: response.body().data.createdAt,
        updatedAt: response.body().data.updatedAt,
      },
    })
  })
  test('get project', async ({ client }) => {
    await client.post('/projects').json({
      name: 'test',
      description: 'test',
    })
    const response = await client.get('/projects/1')
    response.assertBodyContains({
      data: {
        name: 'test',
        description: 'test',
        id: 1,
      },
    })
  })
  test('update project', async ({ client }) => {
    await client.post('/projects').json({
      name: 'test',
      description: 'test',
    })
    const response = await client.put('/projects/1').json({
      name: 'test2',
      description: 'test2',
    })
    response.assertStatus(200)
    response.assertBodyContains({
      data: {
        name: 'test2',
        description: 'test2',
        id: 1,
      },
    })
  })
  test('add participant to project', async ({ client }) => {
    const userResponse = await client.post('/users').json({
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.test',
    })
    // console.log('userRespons', userResponse.body())
    const projectResponse = await client.post('/projects').json({
      name: 'test',
      description: 'test',
    })
    // console.log('projectRespons', projectResponse.body())
    const response = await client.post('/projects/1/team').json({
      users: [1],
      roles: ['test'],
    })
    // console.log('response', response)
    response.assertStatus(200)
    response.assertBodyContains({
      message: 'Users added to project successfully',
    })
  })
  test('get project participants', async ({ client, assert }) => {
    await client.post('/users').json({
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.test',
    })

    await client.post('/projects').json({
      name: 'test',
      description: 'test',
    })

    await client.post('/projects/1/team').json({
      users: [1],
      roles: ['test'],
    })
    const response = await client.get('/projects/1/team')
    response.assertStatus(200)
    assert.exists(response.body().data.test, 'Data field should exist')
  })
})

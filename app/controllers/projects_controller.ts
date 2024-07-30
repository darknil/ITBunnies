/* eslint-disable unicorn/no-for-loop */
import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import User from '#models/user'
import { createProjectValidator, updateProjectValidator } from '#validators/project'
import AlreadyExistsException from '../exceptions/already_exists_exception.js'
import NotFoundException from '#exceptions/not_found_exception'
import BadRequestException from '#exceptions/bad_request_exeption'

export default class ProjectsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const projects = await Project.all()
    return projects
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createProjectValidator)
    const existingProject = await Project.findBy('name', payload.name)
    if (existingProject) {
      throw new AlreadyExistsException('Project already exists')
    }
    const project = await Project.create(payload)
    return project
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const project = await Project.findBy('id', params.id)
    if (!project) {
      throw new NotFoundException('Project not found')
    }
    return project
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    const payload = await request.validateUsing(updateProjectValidator)
    project.merge(payload)
    await project.save()
    return project
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const project = await Project.findBy('id', params.id)
    if (!project) {
      throw new NotFoundException('Project not found')
    }
    await project.delete()
    return project
  }
  async addUsersToProject({ params, response, request }: HttpContext) {
    const project = await Project.find(params.id)
    if (!project) {
      throw new NotFoundException('Project not found')
    }
    const userIds = request.input('users')
    const roles = request.input('roles')
    if (!userIds || !roles || userIds.length !== roles.length) {
      throw new BadRequestException('Invalid input data')
    }
    try {
      for (let i = 0; i < userIds.length; i++) {
        const user = await User.find(userIds[i])
        if (!user) {
          throw new NotFoundException(`User with id ${userIds[i]} not found`)
        }
        const role = roles[i]

        await project.related('team').attach({
          [user.id]: { role },
        })
      }
      return response.status(200).send({ message: 'Users added to project successfully' })
    } catch (error) {
      console.log('add users to project error', error)
      return response.status(500).send({ message: 'Failed to add users to project', error })
    }
  }
  async getProjectUsers({ params }: HttpContext) {
    const project = await Project.findBy('id', params.id)
    if (!project) {
      throw new NotFoundException('Project not found')
    }
    await project.load('team', (query) => {
      query
        .select([
          'id',
          'first_name',
          'last_name',
          'email',
          'bio',
          'interests',
          'technologies',
          'experience',
          'phone',
          'telegram_link',
          'portfolio_link',
          'photo_url',
          'created_at',
          'updated_at',
        ])
        .pivotColumns(['role'])
    })
    const team = project.team

    const result: { [key: string]: any } = {}
    team.forEach((user) => {
      result[user.$extras.pivot_role] = user
    })

    return result
  }
}

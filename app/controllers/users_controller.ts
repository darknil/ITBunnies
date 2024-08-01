import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'
import { createUserValidator, updateUserValidator } from '#validators/user'
import AlreadyExistsException from '../exceptions/already_exists_exception.js'
import NotFoundException from '#exceptions/not_found_exception'
export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const users = await User.all()
    return {
      data: users.map((user) => user.toJSON()), // Преобразование модели в обычный объект
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)

    const existingUser = await User.findBy('email', payload.email)
    if (existingUser) {
      throw new AlreadyExistsException(`User with email ${payload.email} already exists`)
    }
    try {
      const user = await User.create(payload)
      return response.created({ message: 'User created successfully', data: user })
    } catch (error) {
      throw new Error('User creation failed')
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const user = await User.findBy('id', params.id)
    if (!user) {
      throw new NotFoundException(`User with id ${params.id} not found`)
    }
    return response.status(200).json({
      message: 'success',
      data: user,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const user = await User.findBy('id', params.id)
    if (!user) {
      throw new NotFoundException(`User with id ${params.id} not found`)
    }
    const validatedData = await request.validateUsing(updateUserValidator)

    user.merge(validatedData)
    await user.save()
    return response.status(200).json({
      message: 'updated',
      data: user,
    })
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const user = await User.findBy('id', params.id)
    if (!user) {
      throw new NotFoundException(`User with id ${params.id} not found`)
    }
    await user.delete()
    return user
  }
  async getUserProjects({ params, response }: HttpContext) {
    const user = await User.findBy('id', params.id)
    if (!user) {
      throw new NotFoundException(`User with id ${params.id} not found`)
    }
    const projects = await user.related('projects').query().pivotColumns(['role'])

    // Создаем результирующий объект
    const result: { [key: string]: any } = {}

    projects.forEach((project) => {
      const role = project.$extras.pivot_role
      result[role] = project
    })

    return response.status(200).json({
      message: 'success',
      data: result,
    })
  }
}

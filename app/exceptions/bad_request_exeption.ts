import { Exception } from '@adonisjs/core/exceptions'

export default class BadRequestException extends Exception {
  constructor(message: string = 'Bad request') {
    super(message, { status: 400 })
  }
}

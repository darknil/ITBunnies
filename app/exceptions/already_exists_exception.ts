import { Exception } from '@adonisjs/core/exceptions'

export default class AlreadyExistsException extends Exception {
  constructor(message: string = 'Resource already exists') {
    super(message, { status: 409 }) // 409 Conflict HTTP status code
  }
}

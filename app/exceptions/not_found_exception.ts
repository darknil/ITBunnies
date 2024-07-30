import { Exception } from '@adonisjs/core/exceptions'

export default class NotFoundException extends Exception {
  constructor(message: string = 'Resourse not found') {
    super(message, { status: 404 }) // 409 Conflict HTTP status code
  }
}

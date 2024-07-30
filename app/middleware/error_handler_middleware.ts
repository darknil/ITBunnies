import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ErrorHandlerMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    try {
      await next()
    } catch (error) {
      console.error(error)
      const status = error.status || 500
      const message = error.message || 'Something went wrong'

      ctx.response.status(status).send({
        error: {
          message: message,
          details: error?.messages || null,
        },
      })
    }
    /**
     * Call next method in the pipeline and return its output
     */
  }
}

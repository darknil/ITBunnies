import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().minLength(3).maxLength(15),
    lastName: vine.string().minLength(3).maxLength(15),
    email: vine.string().email().maxLength(255),
  })
)
export const updateUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().minLength(3).maxLength(15).optional(),
    lastName: vine.string().minLength(3).maxLength(15).optional(),
    email: vine.string().email().maxLength(255).optional(),
    bio: vine.string().maxLength(255).optional(),
    phone: vine.string().maxLength(255).optional(),
    telegramLink: vine.string().maxLength(255).optional(),
    portfolioLink: vine.string().maxLength(255).optional(),
    interests: vine.string().maxLength(255).optional(),
    technologies: vine.array(vine.string().maxLength(255)).optional(),
  })
)

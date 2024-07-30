import vine from '@vinejs/vine'

export const createProjectValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(30),
    description: vine.string().minLength(3).maxLength(1000),
  })
)
export const updateProjectValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(30).optional(),
    description: vine.string().minLength(3).maxLength(1000).optional(),
    status: vine.string().minLength(3).maxLength(30).optional(),
    developmentDate: vine.array(vine.string().maxLength(255)).optional(),
    technologies: vine.array(vine.string().maxLength(255)).optional(),
    notes: vine.array(vine.string().maxLength(255)).optional(),
  })
)

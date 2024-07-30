import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column({
    prepare: (value: Array<string> | null) => JSON.stringify(value),
    consume: (value: string | null) => (value ? JSON.parse(value) : null),
  })
  declare photos: Array<string> | null

  @column({
    prepare: (value: Array<string> | null) => JSON.stringify(value),
    consume: (value: string | null) => (value ? JSON.parse(value) : null),
  })
  declare developmentDate: Array<string> | null

  @column({
    prepare: (value: Array<string> | null) => JSON.stringify(value),
    consume: (value: string | null) => (value ? JSON.parse(value) : null),
  })
  declare notes: Array<string> | null

  @column({
    prepare: (value: Array<string> | null) => JSON.stringify(value),
    consume: (value: string | null) => (value ? JSON.parse(value) : null),
  })
  declare technologies: Array<string> | null

  @column()
  declare status: string | null

  @manyToMany(() => User, {
    pivotTable: 'project_user',
    localKey: 'id',
    pivotForeignKey: 'project_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotColumns: ['role'],
  })
  declare team: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

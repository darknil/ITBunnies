import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Project from '../models/project.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string
  @column()
  declare lastName: string
  @column()
  declare email: string
  @column()
  declare bio: string | null
  @column()
  declare interests: string | null
  @column({
    prepare: (value: Array<string> | null) => JSON.stringify(value),
    consume: (value: string | null) => (value ? JSON.parse(value) : null),
  })
  declare technologies: Array<string> | null
  @column({
    prepare: (value: Array<string> | null) => JSON.stringify(value),
    consume: (value: string | null) => (value ? JSON.parse(value) : null),
  })
  declare experience: Array<string> | null
  @column()
  declare phone: string | null
  @column()
  declare telegramLink: string | null
  @column()
  declare portfolioLink: string | null
  @column()
  declare photo_url: string | null
  @manyToMany(() => Project, {
    pivotTable: 'project_user',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'project_id',
    pivotColumns: ['role'],
  })
  declare projects: ManyToMany<typeof Project>
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
  first_name: any
}

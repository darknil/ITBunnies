import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateUsersTable extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('email').notNullable().unique()
      table.text('bio').nullable()
      table.text('interests').nullable()
      table.text('technologies').nullable()
      table.text('experience').nullable()
      table.string('phone').nullable()
      table.string('telegram_link').nullable()
      table.string('portfolio_link').nullable()
      table.string('photo_url').nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

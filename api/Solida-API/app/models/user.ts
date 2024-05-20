import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Report from './report.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Volunteer from './volunteer.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column()
  declare photo: string

  @column()
  declare type: number

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(()=>Volunteer)
  declare volunteer : HasMany<typeof Volunteer>

  @hasMany(()=>Report)
  declare createdReports: HasMany<typeof Report>

  @manyToMany(() => Report, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'report_id',
    pivotTable: 'volunteers'
  })
  declare volunteering: ManyToMany<typeof Report>

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: "2 days",
  })
}
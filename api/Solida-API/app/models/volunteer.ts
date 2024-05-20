import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Report from './report.js'

export default class Volunteer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare userId: number

  @belongsTo(() => User, {
    foreignKey: 'userId',
  }) 
  declare volunteerUser: BelongsTo<typeof User>

  @column()
  declare reportId: number

  @belongsTo(() => Report, {
    foreignKey: 'reportId',
  }) 
  declare report: BelongsTo<typeof Report>
}
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Volunteer from './volunteer.js'

export default class Report extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number
  

  @column()
  declare category: string

  @column()
  declare cords: string

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare imageUrl: string

  @column()
  declare status: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'userId',
  }) 
  declare creator: BelongsTo<typeof User>

  @hasMany(()=>Volunteer)
  declare volunteer : HasMany<typeof Volunteer>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'report_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'volunteers'
  })
  declare volunteers: ManyToMany<typeof User>

}
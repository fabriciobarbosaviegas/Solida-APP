var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import User from './user.js';
import Volunteer from './volunteer.js';
export default class Report extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Report.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Report.prototype, "userId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Report.prototype, "category", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Report.prototype, "cords", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Report.prototype, "title", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Report.prototype, "description", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Report.prototype, "imageUrl", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Report.prototype, "status", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Report.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Report.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => User, {
        foreignKey: 'userId',
    }),
    __metadata("design:type", Object)
], Report.prototype, "creator", void 0);
__decorate([
    hasMany(() => Volunteer),
    __metadata("design:type", Object)
], Report.prototype, "volunteer", void 0);
__decorate([
    manyToMany(() => User, {
        localKey: 'id',
        pivotForeignKey: 'report_id',
        relatedKey: 'id',
        pivotRelatedForeignKey: 'user_id',
        pivotTable: 'volunteers'
    }),
    __metadata("design:type", Object)
], Report.prototype, "volunteers", void 0);
//# sourceMappingURL=report.js.map
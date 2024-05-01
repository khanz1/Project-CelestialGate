"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redirect = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../../auth/models/user.model");
let Redirect = class Redirect extends sequelize_typescript_1.Model {
};
exports.Redirect = Redirect;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Redirect.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        field: 'user_id',
    }),
    __metadata("design:type", Number)
], Redirect.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Redirect.prototype, "User", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'from_url',
    }),
    __metadata("design:type", String)
], Redirect.prototype, "fromUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'to_url',
    }),
    __metadata("design:type", String)
], Redirect.prototype, "toUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'active_from',
    }),
    __metadata("design:type", Date)
], Redirect.prototype, "activeFrom", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'active_to',
    }),
    __metadata("design:type", Date)
], Redirect.prototype, "activeTo", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        field: 'created_at',
    }),
    __metadata("design:type", Date)
], Redirect.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        field: 'updated_at',
    }),
    __metadata("design:type", Date)
], Redirect.prototype, "updatedAt", void 0);
exports.Redirect = Redirect = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'gp_redirects', underscored: true })
], Redirect);
//# sourceMappingURL=redirect.model.js.map
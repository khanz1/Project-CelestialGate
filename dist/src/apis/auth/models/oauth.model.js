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
exports.OAuth = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
let OAuth = class OAuth extends sequelize_typescript_1.Model {
};
exports.OAuth = OAuth;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], OAuth.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], OAuth.prototype, "provider", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        field: 'user_id',
    }),
    __metadata("design:type", Number)
], OAuth.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], OAuth.prototype, "User", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'oauth_id',
    }),
    __metadata("design:type", Number)
], OAuth.prototype, "oauthId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], OAuth.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], OAuth.prototype, "username", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], OAuth.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'picture_url',
    }),
    __metadata("design:type", String)
], OAuth.prototype, "pictureUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'oauth_created_at',
    }),
    __metadata("design:type", Date)
], OAuth.prototype, "oauthCreatedAt", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        field: 'created_at',
    }),
    __metadata("design:type", Date)
], OAuth.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        field: 'updated_at',
    }),
    __metadata("design:type", Date)
], OAuth.prototype, "updatedAt", void 0);
exports.OAuth = OAuth = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'auth_oauth_list', underscored: true })
], OAuth);
//# sourceMappingURL=oauth.model.js.map
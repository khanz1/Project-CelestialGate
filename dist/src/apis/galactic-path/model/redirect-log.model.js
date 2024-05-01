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
exports.RedirectLog = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const redirect_model_1 = require("./redirect.model");
let RedirectLog = class RedirectLog extends sequelize_typescript_1.Model {
};
exports.RedirectLog = RedirectLog;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], RedirectLog.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => redirect_model_1.Redirect),
    (0, sequelize_typescript_1.Column)({
        field: 'redirect_id',
    }),
    __metadata("design:type", Number)
], RedirectLog.prototype, "redirectId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => redirect_model_1.Redirect),
    __metadata("design:type", redirect_model_1.Redirect)
], RedirectLog.prototype, "Redirect", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'ip_address',
    }),
    __metadata("design:type", String)
], RedirectLog.prototype, "ipAddress", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'query',
    }),
    __metadata("design:type", String)
], RedirectLog.prototype, "query", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'user_agent',
    }),
    __metadata("design:type", String)
], RedirectLog.prototype, "userAgent", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'data',
    }),
    __metadata("design:type", String)
], RedirectLog.prototype, "data", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        field: 'created_at',
    }),
    __metadata("design:type", Date)
], RedirectLog.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        field: 'updated_at',
    }),
    __metadata("design:type", Date)
], RedirectLog.prototype, "updatedAt", void 0);
exports.RedirectLog = RedirectLog = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'gp_redirects_logs', underscored: true })
], RedirectLog);
//# sourceMappingURL=redirect-log.model.js.map
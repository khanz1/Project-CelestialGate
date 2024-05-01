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
exports.LogsApi = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let LogsApi = class LogsApi extends sequelize_typescript_1.Model {
};
exports.LogsApi = LogsApi;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], LogsApi.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], LogsApi.prototype, "text", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], LogsApi.prototype, "operation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'ip_address',
    }),
    __metadata("design:type", String)
], LogsApi.prototype, "ipAddress", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        field: 'created_at',
    }),
    __metadata("design:type", Date)
], LogsApi.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        field: 'updated_at',
    }),
    __metadata("design:type", Date)
], LogsApi.prototype, "updatedAt", void 0);
exports.LogsApi = LogsApi = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'logs_api', underscored: true })
], LogsApi);
//# sourceMappingURL=logs-api.model.js.map
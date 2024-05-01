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
exports.OwnedFile = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../../auth/models/user.model");
let OwnedFile = class OwnedFile extends sequelize_typescript_1.Model {
};
exports.OwnedFile = OwnedFile;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], OwnedFile.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        field: 'user_id',
    }),
    __metadata("design:type", Number)
], OwnedFile.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], OwnedFile.prototype, "User", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'file_name',
    }),
    __metadata("design:type", String)
], OwnedFile.prototype, "fileName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'file_url',
    }),
    __metadata("design:type", String)
], OwnedFile.prototype, "fileUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'file_type',
    }),
    __metadata("design:type", String)
], OwnedFile.prototype, "fileType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'public_file_url',
    }),
    __metadata("design:type", String)
], OwnedFile.prototype, "publicFileUrl", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        field: 'created_at',
    }),
    __metadata("design:type", Date)
], OwnedFile.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        field: 'updated_at',
    }),
    __metadata("design:type", Date)
], OwnedFile.prototype, "updatedAt", void 0);
exports.OwnedFile = OwnedFile = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'aa_owned_files', underscored: true })
], OwnedFile);
//# sourceMappingURL=owned-files.model.js.map
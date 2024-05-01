"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.DATABASE = exports.PASSWORD = exports.USERNAME = exports.PORT = exports.HOST = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const path = __importStar(require("path"));
const NODE_ENV = (process.env.NODE_ENV || 'development').trim();
const envPath = path.resolve(__dirname, `../../.env.${NODE_ENV}`);
dotenv_1.default.config({ path: envPath });
exports.HOST = process.env.DB_HOST || 'localhost';
exports.PORT = +(process.env.DB_PORT || 5432);
exports.USERNAME = process.env.DB_USERNAME || 'postgres';
exports.PASSWORD = process.env.DB_PASSWORD || 'postgres';
exports.DATABASE = process.env.DB_DATABASE || 'test_db';
exports.client = new pg_1.Client({
    host: exports.HOST,
    port: exports.PORT,
    database: exports.DATABASE,
    user: exports.USERNAME,
    password: exports.PASSWORD,
});
//# sourceMappingURL=pg-connection.js.map
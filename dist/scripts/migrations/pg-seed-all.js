"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_connection_1 = require("./pg-connection");
const nanoid_1 = require("nanoid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../../src/apis/auth/models/user.model");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: pg_connection_1.DATABASE,
    dialect: 'postgres',
    username: pg_connection_1.USERNAME,
    password: pg_connection_1.PASSWORD,
    models: [user_model_1.User],
});
const getUsers = () => {
    return [
        {
            uid: (0, nanoid_1.nanoid)(),
            username: 'xavier',
            email: 'assistance.xavier@gmail.com',
            password: bcrypt_1.default.hashSync('xavier', bcrypt_1.default.genSaltSync(10)),
            pictureUrl: 'https://i.imgur.com/0kZB9Xu.jpg',
            isVerified: true,
            status: 'active',
        },
    ];
};
(async () => {
    await sequelize.sync();
    const users = await user_model_1.User.bulkCreate(getUsers());
    console.log(`seeded ${users.length} users`);
    console.log(`seeded successfully`);
    await sequelize.close();
    process.exit(0);
})();
//# sourceMappingURL=pg-seed-all.js.map
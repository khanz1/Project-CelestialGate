import sequelize from './pg-connection';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

const queryInterface = sequelize.getQueryInterface();

const getUsers = () => {
  return [
    {
      uid: nanoid(15),
      username: 'xavier',
      email: 'assistance.xavier@gmail.com',
      password: bcrypt.hashSync('xavier', bcrypt.genSaltSync(10)),
      picture_url: 'https://i.imgur.com/0kZB9Xu.jpg',
      is_verified: true,
    },
  ];
};

(async () => {
  await sequelize.sync();
  await queryInterface.bulkInsert('auth_users', getUsers());
  console.log(`seeded successfully`);
  await sequelize.close();
  process.exit(0);
})();

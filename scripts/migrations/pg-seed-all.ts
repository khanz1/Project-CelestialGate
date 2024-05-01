import { DATABASE, PASSWORD, USERNAME } from './pg-connection';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../../src/apis/auth/models/user.model';

const sequelize = new Sequelize({
  database: DATABASE,
  dialect: 'postgres',
  username: USERNAME,
  password: PASSWORD,
  models: [User],
});

const getUsers = (): Partial<User>[] => {
  return [
    {
      uid: nanoid(),
      username: 'xavier',
      email: 'assistance.xavier@gmail.com',
      password: bcrypt.hashSync('xavier', bcrypt.genSaltSync(10)),
      pictureUrl: 'https://i.imgur.com/0kZB9Xu.jpg',
      isVerified: true,
      status: 'active',
    },
  ];
};

(async () => {
  await sequelize.sync();
  const users = await User.bulkCreate(getUsers());
  console.log(`seeded ${users.length} users`);

  console.log(`seeded successfully`);
  await sequelize.close();
  process.exit(0);
})();

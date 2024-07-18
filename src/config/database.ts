// import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME!,
//   process.env.DB_USER!,
//   process.env.DB_PASS!,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//   }
// );

// export default sequelize;

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME!, 
  process.env.DB_USER!, 
  process.env.DB_PASS!, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
    charset: 'utf8mb4', // Use the correct charset
  },
  logging: false, // Disable logging for tests
});

export default sequelize;

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('test_zusn', 'test_zusn_user', 'kJrUAYN3i4Q5D6ZSVrDcePPNrsIAXHhF', {
  // host: 'dpg-cf962jarrk0e2av109fg-a.oregon-postgres.render.com',
  host: 'dpg-cf962jarrk0e2av109fg-a',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  dialect: 'postgres',
  logging: false
}
);

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
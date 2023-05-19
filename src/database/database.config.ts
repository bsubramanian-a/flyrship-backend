import * as dotenv from 'dotenv';
import { IDatabaseConfig } from './interfaces/dbconfig.interface';

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_DEVELOPMENT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true, // Require an SSL/TLS connection
        rejectUnauthorized: false, // Disable SSL verification (only for development/testing)
      },
    },
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true, // Require an SSL/TLS connection
        rejectUnauthorized: false, // Disable SSL verification (only for development/testing)
      },
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_PRODUCTION,
    host: process.env.DB_HOST,
    logging: false, 
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true, // Require an SSL/TLS connection
        rejectUnauthorized: false, // Disable SSL verification (only for development/testing)
      },
    },
  },
};

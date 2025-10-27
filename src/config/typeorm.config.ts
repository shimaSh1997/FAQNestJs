import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Question } from "../question/question.entity";
import { Topic } from "../topic/topic.entity";
import { Section } from "../section/section.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "mssql",
  host: "localhost",
  port: 1433,
  username: process.env.DB_USER, // TODO: replace with your username
  password: process.env.DB_PASSWORD, // TODO: replace with your password
  database: "FAQ",
  entities: [Question, Topic, Section],
  synchronize: true, // DEV only, do not use in production
  options: {
    encrypt: false, // for local dev, adjust as needed
  },
};

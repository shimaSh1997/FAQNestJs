import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { QuestionModule } from "./question/question.module";
import { TopicModule } from "./topic/topic.module";
import { SectionModule } from "./section/section.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    QuestionModule,
    TopicModule,
    SectionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

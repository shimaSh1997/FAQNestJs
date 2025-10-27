import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";
import { IsQuestionUniqueValidator } from "./dto/is-question-unique.validator";

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionController],
  providers: [QuestionService, IsQuestionUniqueValidator],
})
export class QuestionModule {}

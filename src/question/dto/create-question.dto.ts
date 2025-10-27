import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { IsValidQuestion } from './question.validator';
import { IsQuestionUnique } from './is-question-unique.validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  @IsValidQuestion()
  @IsQuestionUnique()
  question: string;

  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsOptional()
  @IsNumber()
  viewCount?: number;

  @IsOptional()
  @IsNumber()
  likes?: number;

  @IsOptional()
  @IsNumber()
  dislikes?: number;

  @IsOptional()
  @IsEnum(['draft', 'public'])
  status?: 'draft' | 'public';

  @IsOptional()
  @IsNumber()
  topicId?: number;
}

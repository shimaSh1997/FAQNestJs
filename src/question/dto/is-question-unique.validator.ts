import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { QuestionService } from '../question.service';

@ValidatorConstraint({ name: 'IsQuestionUnique', async: true })
@Injectable()
export class IsQuestionUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly questionService: QuestionService) {}

  async validate(question: string): Promise<boolean> {
    try {
      return !(await this.questionService.questionExists(question));
    } catch (error) {
      console.error('IsQuestionUniqueValidator error:', error);
      return true;
    }
  }

  defaultMessage(): string {
    return 'This question already exists in the database.';
  }
}

export function IsQuestionUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsQuestionUniqueValidator,
    });
  };
}

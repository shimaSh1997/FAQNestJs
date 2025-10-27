import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsValidQuestion(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidQuestion',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string' || value.trim().length === 0) {
            return false;
          }
          
          // Question must be at least 10 characters
          if (value.length < 10) {
            return false;
          }
          
          // Question must end with a question mark
          if (!value.trim().endsWith('?')) {
            return false;
          }
          
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid question: \n` +
                 `- At least 10 characters long \n` +
                 `- Must end with a question mark`;
        }
      }
    });
  };
}

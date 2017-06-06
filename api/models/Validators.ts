import * as classValidator from "class-validator";
import { ValidationOptions, registerDecorator, ValidationArguments, ValidateIf } from "class-validator";
import { getFromContainer, IsEmailOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { MetadataStorage } from "class-validator/metadata/MetadataStorage";
import { ValidationMetadata } from "class-validator/metadata/ValidationMetadata";
import { ValidationMetadataArgs } from "class-validator/metadata/ValidationMetadataArgs";
import { ValidationTypes } from "class-validator/validation/ValidationTypes";
import { getConnection } from "typeorm";
import User from "./User";

/**
 * Checks if value is missing and if so, ignores all validators.
 */
export function IsOptional(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    const args: ValidationMetadataArgs = {
      type: ValidationTypes.CONDITIONAL_VALIDATION,
      target: object.constructor,
      propertyName: propertyName,
      constraints: [(object: any, value: any) => {
        return object[propertyName] !== "" && object[propertyName] !== null;
      }],
      validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(new ValidationMetadata(args));
  };
}

/**
 * Wrap existing validators to override the default message.
 */

export function MinLength(min: number, validationOptions?: ValidationOptions) {
  return classValidator.MinLength(min, Object.assign({
    message: min == 1 ? "is required" : "must be at least $constraint1 characters"
  }, validationOptions));
}

export function IsEmail(options?: IsEmailOptions, validationOptions?: ValidationOptions) {
  return classValidator.IsEmail(options, Object.assign({
    message: "must be a valid email address"
  }, validationOptions));
}

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistByEmailConstraint implements ValidatorConstraintInterface {
  validate(email: any, args: ValidationArguments) {
    return getConnection().getRepository(User).createQueryBuilder("u").
      where("u.email=:email", { email }).
      getOne().then((user) => {
        return !user;
      });
  }
}

export function IsUserAlreadyExistByEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistByEmailConstraint
    });
  };
}

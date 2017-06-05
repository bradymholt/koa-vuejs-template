import "reflect-metadata";
import { Length, IsEmail } from "class-validator";

export default class AuthCredentials {
  @IsEmail()
  email: string;

  @Length(3, 20)
  password: string;
}

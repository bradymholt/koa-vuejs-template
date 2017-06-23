import "reflect-metadata";
import { Length, IsEmail } from "class-validator";
import AuthCredentials from "./AuthCredentials";
import { IsUserAlreadyExistByEmail } from "./Validators";

export default class AuthCredentialsNew extends AuthCredentials {
  @IsUserAlreadyExistByEmail({
    message: "This email address has already been registered."
  })
  email: string;
}

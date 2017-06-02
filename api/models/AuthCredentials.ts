import "reflect-metadata";
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, ValidateIf } from "class-validator";

export default class AuthCredentials {
    @IsEmail()
    email: string;

    @Length(3, 20)
    password: string;
}

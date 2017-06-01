import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { validate, Contains, IsInt, Length, IsFQDN, IsDate, Min, Max, ValidateIf } from "class-validator";
import { IsOptional, MinLength, IsEmail } from "./Validators";

@Entity()
export default class User {
    constructor() {
        this.emailConfirmed = false;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    emailConfirmed: boolean;

    @Column()
    @MinLength(5)
    hashedPassword: string;
}

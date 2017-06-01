import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { validate, Contains, IsInt, Length, IsFQDN, IsDate, Min, Max, ValidateIf } from "class-validator";
import { IContact } from '../../shared/interfaces/IContact';
import { IsOptional, MinLength, IsEmail } from "./Validators";

@Entity()
export default class Contact implements IContact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(0, 20)
    firstName: string;

    @Column()
    @Length(0, 20)
    lastName: string;

    @Column()
    @IsOptional() @IsEmail()
    email: string;

    @Column()
    @IsOptional() @MinLength(7)
    phone: string;
}

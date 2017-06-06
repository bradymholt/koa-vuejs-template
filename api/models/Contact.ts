import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Length } from "class-validator";
import { IsOptional, MinLength, IsEmail } from "./Validators";

import { IContact } from '../interfaces/IContact';

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

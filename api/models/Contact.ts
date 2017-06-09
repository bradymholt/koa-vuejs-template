import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Length } from "class-validator";
import { IsOptional, MinLength, IsEmail } from "./Validators";
import { IContact } from "./interfaces/IContact";

@Entity()
export default class Contact implements IContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(3)
  lastName: string;

  @Column()
  @MinLength(1)
  firstName: string;

  @Column()
  @IsOptional() @MinLength(7)
  phone: string;

  @Column()
  @IsOptional() @IsEmail()
  email: string;
}

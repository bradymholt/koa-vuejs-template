import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";
import { IsOptional, MinLength, IsEmail } from "./Validators";

@Entity()
@Index("idx_email_unique", (user: User) => [user.email], { unique: true })
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

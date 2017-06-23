import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  PrimaryColumn
} from "typeorm";
/**
 * TypeORM will normally create the migrations table automatically but
 * it uses "timestamp" data type for the timestamp column which results
 * in an exception when migrations are run.  We define Migrations model
 * manually to ensure timestamp column is int8.
 */
@Entity()
export default class Migrations {
  @PrimaryColumn("int8") timestamp: number;

  @Column() name: string;
}

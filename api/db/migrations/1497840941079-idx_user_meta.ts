import {
  Connection,
  EntityManager,
  MigrationInterface,
  QueryRunner
} from "typeorm";

export class index1497840941079 implements MigrationInterface {
  public async up(
    queryRunner: QueryRunner,
    connection: Connection,
    entityManager?: EntityManager
  ): Promise<any> {
    queryRunner.query(`
      CREATE INDEX index_user_meta ON "user" USING gin (meta jsonb_path_ops);
      `);
  }

  public async down(
    queryRunner: QueryRunner,
    connection: Connection,
    entityManager?: EntityManager
  ): Promise<any> {
    queryRunner.query("DROP INDEX index_user_meta;");
  }
}

import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRoleEnum1645715146691 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TYPE IF EXISTS "role_enum"`);
        await queryRunner.query(`CREATE TYPE "role_enum" AS ENUM('admin', 'user', 'manager')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TYPE "role_enum"`);
    }

}

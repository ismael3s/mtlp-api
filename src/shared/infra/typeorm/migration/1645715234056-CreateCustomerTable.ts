import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCustomerTable1645715234056 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "customer",
        columns: [
          { name: "id", type: "varchar", isPrimary: true },
          { name: "name", type: "varchar", isNullable: false },
          { name: "email", type: "varchar", isNullable: false, isUnique: true },
          { name: "password", type: "varchar", isNullable: false },
          {
            name: "role",
            type: "enum",
            enum: ["user", "manager", "admin"],
            enumName: "role_enum",
          },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("customer");
  }
}

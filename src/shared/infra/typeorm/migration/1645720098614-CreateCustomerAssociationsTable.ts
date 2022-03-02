import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCustomerAssociationsTable1645720098614
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "customer_association",
        columns: [
          {
            name: "customer_owner_id",
            type: "varchar",
          },
          {
            name: "customer_id",
            type: "varchar",
          },
        ],
        foreignKeys: [
          {
            referencedTableName: "customer",
            columnNames: ["customer_owner_id"],
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },

          {
            referencedTableName: "customer",
            columnNames: ["customer_id"],
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("customer_association");
  }
}

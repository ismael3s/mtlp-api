import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateQuotaTable1645740171468 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "quota",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                },
                {
                    name: "customer_id",
                    type: "varchar",
                },
                {
                    name: "customer_owner_id",
                    type: "varchar",
                },
                {
                    name: "value",
                    type: "numeric",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                }
            ],

            foreignKeys: [
                {
                    name: "quota_customer_id_fk",
                    columnNames: ["customer_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "customer",
                },
                {
                    name: "quota_customer_owner_id_fk",
                    columnNames: ["customer_owner_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "customer",
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("quota");
    }

}

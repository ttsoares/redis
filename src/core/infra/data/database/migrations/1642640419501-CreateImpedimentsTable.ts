import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateImpedimentsTable1642640419501 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: "impediments",
        columns: [
          {
            name: "uid",
            type: "UUID",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "title",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "uid_project",
            type: "UUID",
            isNullable: false,
          },
          {
            name: "resolve",
            type: "boolean",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: false,
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: "fk_project_impediment",
            columnNames: ["uid_project"],
            referencedTableName: "projects",
            referencedColumnNames: ["uid"],
          }),
        ],
      })
    );
  };

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable("impediments", true, true, true);
  };
}

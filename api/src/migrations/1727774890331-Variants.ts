import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Variants1727774890331 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'variants',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'inStock',
            type: 'varchar',
          },
          {
            name: 'option',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'varchar',
          },
          {
            name: 'productId',
            type: 'bigint',
            foreignKeyConstraintName: 'fk_variants_product',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'productId',
            columnNames: ['productId'],
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

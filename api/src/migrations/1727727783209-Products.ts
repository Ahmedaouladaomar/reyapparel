import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Products1727727783209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'price',
            type: 'decimal',
          },
          {
            name: 'imageURL',
            type: 'varchar',
          },
          {
            name: 'imagesURL',
            type: 'varchar',
            isArray: true
          },
          {
            name: 'collectionId',
            type: 'bigint',
            foreignKeyConstraintName: 'fk_products_collection',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'deletedAt',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'collectionId',
            columnNames: ['collectionId'],
            referencedTableName: 'collections',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

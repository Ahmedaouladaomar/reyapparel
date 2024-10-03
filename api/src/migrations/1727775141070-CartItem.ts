import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CartItem1727775141070 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cart_item',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'quantity',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cartId',
            type: 'bigint',
            foreignKeyConstraintName: 'fk_cart_item_cart',
          },
          {
            name: 'variantId',
            type: 'bigint',
            foreignKeyConstraintName: 'fk_cart_item_variant',
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
            name: 'cartId',
            columnNames: ['cartId'],
            referencedTableName: 'cart',
            referencedColumnNames: ['id'],
          },
          {
            name: 'variantId',
            columnNames: ['variantId'],
            referencedTableName: 'variants',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {
  Between,
  In,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { getDateNow } from 'src/helpers';
import { CollectionsService } from 'src/collections/collections.service';
import { Variant } from './entities/variant.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Variant)
    private variantsRepository: Repository<Variant>,
    private collectionsService: CollectionsService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { collectionId, variants, ...rest } = createProductDto;
    const createdAt = getDateNow();
    let res: any;
    try {
      res = await this.productsRepository.save({
        createdAt: createdAt,
        ...rest,
      });
      if (res) {
        // Adding product to collection
        await this.addToCollection(res.id, collectionId);
        // Creating variants for the new product
        for (let variant of variants) {
          let option = 'size';
          let { value, inStock } = variant;
          // Create new product variant
          console.log(res);
          await this.createVariant(res, option, value, inStock);
        }
      }
    } catch (err) {
      return {
        error: `${err.detail}`,
      };
    }
    return {
      success: 'Product added successfully',
    };
  }

  async createVariant(
    product: Product,
    option: string,
    value: string,
    inStock: number,
  ) {
    // New variant
    let variant = new Variant();
    // Fields
    variant.option = option;
    variant.value = value;
    variant.inStock = inStock;
    variant.product = product;
    // save to db
    return this.variantsRepository.save(variant);
  }

  findVariant(id: number) {
    return this.variantsRepository.findOneBy({ id: id });
  }

  async countAll(search: string = null) {
    const param = {
      where: search
        ? [{ name: Like(`%${search}%`) }, { description: Like(`%${search}%`) }]
        : [],
    };
    const res = await this.productsRepository.find(param);
    return res.length;
  }

  async countAllPlp({ price = null, collection = null }) {
    const res = await this.findAllPlp({ price, collection });
    return res.length;
  }

  findAll(rpp: number, p: number, search: string, sort: string) {
    let param = {};
    // rows per page and page number
    if (rpp && p) {
      let order = {};
      order[`${sort}`] = 'ASC';
      // typeorm find options
      param = {
        where: search
          ? [
              { name: Like(`%${search}%`) },
              { description: Like(`%${search}%`) },
            ]
          : [],
        take: rpp,
        skip: (p - 1) * rpp,
        order: sort ? order : {},
        relations: {
          variants: true,
        },
      };
    }

    return this.productsRepository.find(param);
  }

  async findAllPlp({ rpp = null, p = null, price = null, collection = null }) {
    // get collections
    let collectionId = collection;
    let collectionIds = [];
    if (collectionId) {
      let collections = collectionId.split(',');
      for (let id of collections) {
        collectionIds.push(parseInt(id));
      }
    }

    // get price params
    let priceParams = price?.split(',');
    let prices = [];

    // setting price conditions
    priceParams.forEach((item: any) => {
      if (item.indexOf('min_price') != -1 && item.indexOf('max_price') != -1) {
        let tempS = item.split('-');
        let minPrice = parseInt(tempS[0].split('min_price=')[1]);
        let maxPrice = parseInt(tempS[1].split('max_price=')[1]);
        prices.push(Between(minPrice, maxPrice));
      } else {
        if (item.indexOf('min_price') != -1) {
          let tempS = item.split('min_price=');
          let minPrice = parseInt(tempS[1]);
          prices.push(MoreThanOrEqual(minPrice));
        } else {
          if (item.indexOf('max_price') != -1) {
            let tempS = item.split('max_price=');
            let maxPrice = parseInt(tempS[1]);
            prices.push(LessThanOrEqual(maxPrice));
          }
        }
      }
    });

    // find options
    let options = [];

    if (collectionId && price) {
      collectionIds.forEach((id) => {
        prices.forEach((priceCondition) => {
          options.push({
            collection: {
              id: id,
            },
            price: priceCondition,
          });
        });
      });
    } else {
      if (collectionId) {
        options.push({
          collection: {
            id: In([...collectionIds]),
          },
        });
      } else {
        if (price) {
          prices.forEach((item) => {
            options.push({
              price: item,
            });
          });
        }
      }
    }

    let param = {};
    if (rpp && p) {
      // typeorm find params
      param = {
        where: options,
        take: rpp,
        skip: (p - 1) * rpp,
        relations: {
          variants: true,
        },
      };
    } else {
      // typeorm find params
      param = {
        where: options,
        relations: {
          variants: true,
        },
      };
    }

    return this.productsRepository.find(param);
  }

  async findAllWithCount(rpp: number, p: number, search: string, sort: string) {
    // Products rows
    const rows = await this.findAll(+rpp, +p, search, sort);
    // Products count
    const count = await this.countAll(search);
    return {
      rows: rows,
      count: count,
    };
  }

  async findAllPlpWithCount({
    rpp = null,
    p = null,
    price = null,
    collection = null
  }) {
    // Products rows
    const rows = await this.findAllPlp({ rpp, p, price, collection });
    // Products count
    const count = await this.countAllPlp({ price, collection });
    return {
      rows: rows,
      count: count,
    };
  }

  findOne(id: number) {
    return this.productsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        collection: true,
        variants: true,
      },
    });
  }

  findOneByName(name: string) {
    return this.productsRepository.findOne({
      where: {
        name: name,
      },
      relations: {
        collection: true,
        variants: true,
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    let res: any;
    let { collectionId, ...rest } = updateProductDto;
    try {
      res = await this.productsRepository.update({ id: id }, { ...rest });
      res && collectionId && (await this.addToCollection(id, collectionId));
    } catch (err) {
      return {
        error: `${err.detail}`,
      };
    }
    return {
      success: 'Product updated successfully',
    };
  }

  async addToCollection(id: number, collectionId: number) {
    // find product related to id
    const product = await this.findOne(id);
    // find collection related to collectionId
    const collection = await this.collectionsService.findOne(collectionId);
    // update product's collection
    product.collection = collection;

    return this.productsRepository.save(product);
  }

  async addVariant(productId: number, variantId: number) {
    // find product related to id
    let product = await this.findOne(productId);
    // find variant related to id
    let variant = await this.variantsRepository.findOneBy({ id: variantId });
    // update product's variant
    if (product.variants && product.variants.length > 0)
      product.variants.push(variant);
    else product.variants = [variant];

    return this.productsRepository.save(product);
  }

  async updateVariantStock(variantId: number, quantity: number) {
    console.log(quantity);
    // find variant related to id
    let variant = await this.variantsRepository.findOneBy({ id: variantId });
    // check if variant exists
    if (!variant || quantity < 0) return;
    console.log(variant);
    // update product's variant
    variant.inStock = quantity;
    return this.variantsRepository.save(variant);
  }

  async remove(id: number) {
    let res: any;
    try {
      res = await this.productsRepository.delete(id);
    } catch (err) {
      return {
        error: `${err.detail}`,
      };
    }
    return {
      success: 'Product deleted successfully',
    };
  }
}

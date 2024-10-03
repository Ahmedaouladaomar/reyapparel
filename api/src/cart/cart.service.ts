import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { CartItem } from './entities/cartItem.entity';
import { User } from 'src/users/entities/user.entity';
import { Variant } from 'src/products/entities/variant.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private productsService: ProductsService,
    private usersService: UsersService,
  ) {}

  async create(createCartDto: CreateCartDto) {
    let res: any;
    try {
      res = await this.cartRepository.save({
        ...createCartDto,
        items: [],
      });
    } catch (err) {
      return {
        error: `${err.detail}`,
      };
    }
    return {
      success: 'Cart added successfully',
      cart: res,
    };
  }

  findAll() {
    return this.cartRepository.find();
  }

  findOne(id: number) {
    return this.cartRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
        items: {
          variant: {
            product: true,
          },
        },
      },
    });
  }

  findOneByUserId(id: number) {
    return this.cartRepository.findOne({
      where: {
        user: { id: id },
      },
      relations: {
        items: {
          variant: {
            product: true,
          },
        },
      },
    });
  }

  async findCartByUserId(id: number) {
    let cart = await this.cartRepository.findOne({
      where: {
        user: { id: id },
      },
      relations: {
        items: {
          variant: {
            product: true,
          },
        },
        user: true,
      },
    });
    if (!cart) return;

    return { items: cart.items, totalPrice: cart.totalPrice, cart: cart };
  }

  async addToCart(
    userId: number,
    variantId: number,
    quantity: number,
    price: number,
  ) {
    // quantity
    if (!quantity) quantity = 1;
    // user
    let user = await this.usersService.findOne(userId);
    // cart and cart item variables declarations
    let cart: Cart, cartItem: CartItem, savedCartItem: CartItem;
    // variant
    let variant = await this.productsService.findVariant(variantId);
    if (quantity > variant.inStock) return this.findCartByUserId(user.id);
    // retrieve user related cart if exists
    cart = await this.findOneByUserId(user?.id);
    // in case of null
    if (!cart) {
      cart = new Cart();
      cart.user = user;
      cart.totalPrice = 0;
    }
    // Creating a cart item
    cartItem = new CartItem();
    cartItem.cart = cart;
    cartItem.variant = variant;
    cartItem.quantity = quantity;
    // cart items array not empty
    if (cart.items && cart.items.length) {
      let item: any;
      item = await this.cartItemRepository.findOne({
        where: {
          cart: {
            id: cart.id,
          },
          variant: {
            id: variant.id,
          },
        },
      });
      // if item already exists
      if (item) {
        let newQuantity = quantity + item.quantity;
        // total quantity exceeds stock count
        if (newQuantity > variant.inStock) {
          return this.findCartByUserId(user.id);
        }
        // else
        item.quantity += quantity;
        await this.cartItemRepository.save(item);
      } else {
        // Else we create new cart item
        // save it to db
        savedCartItem = await this.cartItemRepository.save(cartItem);
        // add it to cart items
        cart.items.push(savedCartItem);
      }
    }

    // cart items array is empty
    else {
      // cart total
      cart.totalPrice += price * quantity;
      // saving cart to db
      await this.cartRepository.save(cart);
      // saving cart item to db
      savedCartItem = await this.cartItemRepository.save(cartItem);
      // return
      return this.findCartByUserId(user.id);
    }
    // cart total
    cart.totalPrice += price * quantity;
    // updating
    await this.cartRepository.save(cart);
    // return
    return this.findCartByUserId(user.id);
  }

  async removeFromCart(userId: number, variantId: number, price: number) {
    // retrieving user related cart
    let cart = await this.findOneByUserId(userId);
    // item
    let item: any;
    // retrieving related cart item
    item = await this.cartItemRepository.findOne({
      where: {
        cart: {
          id: cart.id,
        },
        variant: {
          id: variantId,
        },
      },
    });

    if (item) {
      if (item.quantity == 1) {
        // 1 item left
        await this.cartItemRepository.remove(item);
      } else {
        // more than one item left
        item.quantity -= 1;
        await this.cartItemRepository.save(item);
      }
    } else return;

    // cart total
    cart.totalPrice -= price;
    // updating cart
    await this.cartRepository.save(cart);
    // return data
    let data = await this.findCartByUserId(userId);
    // if empty cart, we remove it from db
    if (!data || !data.items.length) {
      await this.remove(cart.id);
      // null
      return;
    }
    // return
    return data;
  }

  async remove(id: number) {
    // Removing related cart items
    await this.cartItemRepository.delete({ cart: { id: id } });
    // Removing cart
    return this.cartRepository.delete(id);
  }
}

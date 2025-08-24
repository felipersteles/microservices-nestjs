import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor() {}

  //   @MessagePattern('create_product')
  //   createProduct(product: any) {
  //     return { message: 'Product created', product };
  //   }

  @MessagePattern('get_products')
  getProducts() {
    return {
      message: 'Products retrieved',
      products: [{ name: 'laptop', price: 1000, id: 1 }],
    };
  }

  @MessagePattern('get_product')
  getProduct(id: number) {
    return {
      message: `Product ${id} retrieved`,
      products: { name: 'laptop', price: 1000, id },
    };
  }

  @EventPattern('order.created')
  updateStock(order: { id: string; productId: string }) {
    console.log('Check stock for product: ' + order.productId);

    console.log('Stock updated');
  }
}

import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

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
      message: 'Products retrived',
      products: [{ name: 'laptop', price: 1000, id: 1 }],
    };
  }

  @MessagePattern('get_product')
  getProduct(id: number) {
    return {
      message: `Product ${id} retrieved`,
      products: { name: 'laptop', price: 1000, id: 1 },
    };
  }
}

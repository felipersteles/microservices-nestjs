import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { MICROSERVICES } from 'src/contants/microservice';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(MICROSERVICES.PRODUCT_REDIS_CLIENT)
    private readonly productRedisClient: ClientProxy,
  ) {}

  @MessagePattern('create_order')
  createOrder(order: { productId: number }) {
    Logger.log(`Order created on Order Microservice`, 'OrderController');
    console.log(order);

    // emitting event to redis do use sync communication between microservices
    this.productRedisClient.emit('order.created', order);

    // getting the product using the same method
    // the first parameter should be the message pattern from product controller
    return this.productRedisClient.send('get_product', order.productId);

    //  { message: 'Order created', order: { ...order, product } };
  }
}

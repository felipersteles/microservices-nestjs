import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor() {}

  @MessagePattern('create_order')
  createOrder(order: any) {
    Logger.log(`Order created on Order Microservice`, 'OrderController');
    console.log(order);

    return { message: 'Order created', order };
  }
}

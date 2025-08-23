import { Body, Controller, Inject, Post } from '@nestjs/common';
import { MICROSERVICES } from 'src/constants/microservices';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_SERVICE_ROUTES } from 'src/constants/order-service.routes';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(MICROSERVICES.ORDERS_SERVICE)
    private readonly ordersServiceClient: ClientProxy,
  ) {}

  @Post()
  createOrder(@Body() order: any) {
    return this.ordersServiceClient.send(
      ORDER_SERVICE_ROUTES.CREATE_ORDER,
      order,
    );
  }
}

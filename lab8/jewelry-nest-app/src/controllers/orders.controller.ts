import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Post() checkout(@Body() body: any) { return this.service.checkout(body); }
}
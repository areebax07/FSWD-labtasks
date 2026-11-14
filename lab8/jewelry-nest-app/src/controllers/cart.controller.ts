import { Controller, Get, Post, Body } from '@nestjs/common';
import { CartService } from '../services/cart.service';

@Controller('api/cart')
export class CartController {
  constructor(private readonly service: CartService) {}
  @Get() get() { return this.service.getCart(); }
  @Post() add(@Body() body: any) { return this.service.addToCart(body); }
}
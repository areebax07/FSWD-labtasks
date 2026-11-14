import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from '../services/products.service';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Post() create(@Body() body: any) { return this.service.create(body); }
}
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly service: UsersService) {}
  @Post('register') register(@Body() body: any) { return this.service.register(body); }
  @Post('login') login(@Body() body: any) { return this.service.login(body); }
}
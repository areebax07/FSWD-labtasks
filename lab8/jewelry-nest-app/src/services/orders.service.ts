import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class OrdersService {
  private file = path.join(process.cwd(), 'store-data.json');
  private read() { return JSON.parse(fs.readFileSync(this.file, 'utf8')); }
  private write(data: any) { fs.writeFileSync(this.file, JSON.stringify(data, null, 2)); }

  findAll() { return this.read().orders; }
  checkout(body: any) {
    const db = this.read();
    const order = { id: Date.now(), items: db.cart, ...body, date: new Date() };
    db.orders.push(order);
    db.cart = [];
    this.write(db);
    return { message: 'Order placed successfully', order };
  }
}
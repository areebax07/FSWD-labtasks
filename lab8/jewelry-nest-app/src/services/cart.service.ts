import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CartService {
  private file = path.join(process.cwd(), 'store-data.json');
  private read() { return JSON.parse(fs.readFileSync(this.file, 'utf8')); }
  private write(data: any) { fs.writeFileSync(this.file, JSON.stringify(data, null, 2)); }

  getCart() { return this.read().cart; }
  addToCart(item: any) {
    const db = this.read();
    db.cart.push(item);
    this.write(db);
    return { message: 'Added to cart', cart: db.cart };
  }
}
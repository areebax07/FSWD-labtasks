import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
  private file = path.join(process.cwd(), 'store-data.json');
  private read() { return JSON.parse(fs.readFileSync(this.file, 'utf8')); }
  private write(data: any) { fs.writeFileSync(this.file, JSON.stringify(data, null, 2)); }

  findAll() { return this.read().products; }
  create(body: any) {
    const db = this.read();
    const item = { id: Date.now(), ...body };
    db.products.push(item);
    this.write(db);
    return item;
  }
}
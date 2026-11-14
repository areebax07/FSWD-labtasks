import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
  private file = path.join(process.cwd(), 'store-data.json');
  private read() { return JSON.parse(fs.readFileSync(this.file, 'utf8')); }
  private write(data: any) { fs.writeFileSync(this.file, JSON.stringify(data, null, 2)); }

  register(body: any) {
    const db = this.read();
    const user = { id: Date.now(), ...body };
    db.users.push(user);
    this.write(db);
    return { message: 'Registered successfully', user };
  }

  login(body: any) {
    const db = this.read();
    const user = db.users.find((u: any) => u.email === body.email && u.password === body.password);
    if (!user) return { error: 'Invalid credentials' };
    return { message: 'Login successful', user };
  }
}
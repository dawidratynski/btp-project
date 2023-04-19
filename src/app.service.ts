import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from './constants';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  async getQuotes() {
    const res = await this.conn.query('SELECT * FROM quote');
    return res.rows;
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from './constants';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

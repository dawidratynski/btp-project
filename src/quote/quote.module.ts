import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteResolver } from './quote.resolver';
import { DbModule } from './../db/db.module';

@Module({
  imports: [DbModule],
  providers: [QuoteService, QuoteResolver]
})
export class QuoteModule {}
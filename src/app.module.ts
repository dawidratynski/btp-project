import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { QuoteModule } from './quote/quote.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    QuoteModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    DbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

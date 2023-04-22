import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddQuoteInput } from './dto/add-quote.input';
import { Quote } from './quote.entity';
import { QuoteService } from './quote.service';


@Resolver(of => Quote)
export class QuoteResolver {
    constructor(private quoteService: QuoteService){}


    @Query(returns => [Quote])
    getQuotes(): Promise<Quote[]>{
        return this.quoteService.getQuotes();
    }

    
    @Mutation(returns => Quote)
    addQuote(@Args('addQuoteInput') addQuoteInput : AddQuoteInput) : Promise<Quote> {
        return this.quoteService.addQuote(addQuoteInput);
    }
}
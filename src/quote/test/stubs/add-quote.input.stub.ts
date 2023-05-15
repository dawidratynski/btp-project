import { AddQuoteInput } from "src/quote/dto/add-quote.input";


export const addQuoteInputStub = (): AddQuoteInput => {
    return {
        ticker: "testTicker",
        timestamp: new Date("3000-01-08T02:05:06.00Z"),
        price: 32.41
    } 
}
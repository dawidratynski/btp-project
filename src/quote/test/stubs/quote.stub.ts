import { Quote } from "src/quote/quote.entity";

export const quoteStub = (): Quote => {
    return {
        id: Date.now(),
        ticker: "testTicker",
        timestamp: new Date("3000-01-08T02:05:06.000Z"),
        price: 32.41
    } 
}
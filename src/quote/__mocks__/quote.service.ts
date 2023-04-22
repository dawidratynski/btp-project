import { quoteStub } from "../test/stubs/quote.stub";


export const QuoteService = jest.fn().mockReturnValue({
    getQuotes: jest.fn().mockImplementation(() => {
        return [
            quoteStub(),
            quoteStub(),
            quoteStub(),
        ];
    }),

    addQuote: jest.fn().mockImplementation(() => {
        return quoteStub();
    })
})
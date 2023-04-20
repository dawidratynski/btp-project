import { quoteStub } from "../test/stubs/quote.stub";

export const QuoteService = jest.fn().mockReturnValue({
    getQuotes: jest.fn().mockResolvedValue(
        [
            quoteStub(),
            quoteStub(),
            quoteStub(),
        ]
    ),

    addQuote: jest.fn().mockResolvedValue(
        quoteStub()
    )
})
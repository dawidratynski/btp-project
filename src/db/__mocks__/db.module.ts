import { PG_CONNECTION } from "./../../constants";
import { quoteStub } from "../../quote/test/stubs/quote.stub";
import { ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";

const dbProvider = {
    provide: 'PG_CONNECTION',
    useFactory: () => {
        const pool = jest.fn().mockResolvedValue({
            query: jest.fn().mockResolvedValue({
                rows: [
                    quoteStub(),
                    quoteStub(),
                    quoteStub(),
                ]
            })
        });
        return pool();
    }
};


@Module({
    providers: [dbProvider, ConfigService],
    exports: [dbProvider],
})
export class DbModule {}

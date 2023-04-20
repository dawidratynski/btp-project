import { Module } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { Pool } from 'pg'
import { ConfigService } from '@nestjs/config';

const dbProvider = {
    provide: PG_CONNECTION,
    inject: [ConfigService],
    useFactory: (configService : ConfigService) =>{
        const pool = new Pool({
            user: configService.get("POSTGRES_USER"),
            host: configService.get("POSTGRES_HOST"),
            database: configService.get("POSTGRES_DB"),
            password: configService.get("POSTGRES_PASSWORD") ,
            port: configService.get<number>("POSTGRES_PORT"),        
        });
        return pool;
    } 
};

@Module({
    providers: [dbProvider],
    exports: [dbProvider],
})
export class DbModule {}

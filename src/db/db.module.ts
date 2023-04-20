import { Module } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { Pool } from 'pg'
import { ConfigService } from '@nestjs/config';
import { log } from 'util';

const dbProvider = {
    provide: PG_CONNECTION,
    inject: [ConfigService],
    useFactory: (configService : ConfigService) =>{
        var pool = new Pool({
            user: 'root',
            host: 'localhost',
            database: 'dev',
            password: 'root',
            port: 5432,        
        });
        return pool;
    } 
};

@Module({
    providers: [dbProvider],
    exports: [dbProvider],
})
export class DbModule {}

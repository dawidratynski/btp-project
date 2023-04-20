import { Field, InputType, Float, GraphQLTimestamp } from "@nestjs/graphql";
import { IsAlpha, IsAlphanumeric, IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { GraphQLDateTime} from 'graphql-iso-date';

@InputType()
export class AddQuoteInput{
    @Field(type => String)
    @IsAlphanumeric()
    @IsNotEmpty()
    ticker:string;

    @Field(type => GraphQLDateTime)
    @IsNotEmpty()
    @IsDate()
    timestamp:Date;

    @Field(type => Float)
    @IsNotEmpty()
    @IsNumber()
    price:number;
}
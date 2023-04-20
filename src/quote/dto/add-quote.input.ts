import { Field, InputType, Float, GraphQLTimestamp } from "@nestjs/graphql";
import { IsAlphanumeric, IsNotEmpty } from "class-validator";
import { GraphQLDateTime} from 'graphql-iso-date';

@InputType()
export class AddQuoteInput{
    @Field(type => String)
    @IsAlphanumeric()
    @IsNotEmpty()
    ticker:string;

    @Field(type => GraphQLDateTime)
    @IsNotEmpty()
    timestamp:Date;

    @Field(type => Float)
    @IsNotEmpty()
    price:number;
}
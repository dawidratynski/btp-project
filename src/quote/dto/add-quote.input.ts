import { Field, InputType, Float, GraphQLTimestamp } from "@nestjs/graphql";
import { GraphQLDateTime} from 'graphql-iso-date';

@InputType()
export class AddQuoteInput{
    @Field(type => String)
    ticker:string;

    @Field(type => GraphQLDateTime)
    timestamp:Date;

    @Field(type => Float)
    price:number;
}
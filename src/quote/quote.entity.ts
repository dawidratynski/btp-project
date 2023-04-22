import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { GraphQLDateTime } from 'graphql-iso-date';


@ObjectType()
export class Quote{
    @Field(type => Int)
    id:number;

    @Field(type => String)
    ticker:string;

    @Field(type => GraphQLDateTime)
    timestamp:Date;

    @Field(type => Float)
    price:number;
}
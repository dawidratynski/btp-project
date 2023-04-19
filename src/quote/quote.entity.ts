import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Quote{
    @Field(type => Int)
    id:number;

    @Field(type => String)
    ticker:string;

    @Field(type => Int)
    timestamp:Date;

    @Field(type => Float)
    price:number;
}
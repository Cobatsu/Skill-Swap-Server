import {  Field, ID, ObjectType, } from "type-graphql";
import { BaseEntity , Entity, Column, PrimaryColumn} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity  {

    @Field(()=>ID)
    @PrimaryColumn()
    id:string;

    @Field()
    @Column()
    name:string;

    @Field()
    @Column()
    surname:string;

    @Field()
    @Column()
    email:string;

    @Field()
    @Column()
    password:string;

}
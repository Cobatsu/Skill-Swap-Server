import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./user";
import { Skill } from "./skill";

@ObjectType()
@Entity()
export class Swap extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(() => Skill, (skill) => skill.swaps)
  @JoinTable()
  skills: Skill[];

  @ManyToOne(() => User)
  with_whom: User;

  @ManyToOne(() => User, (user) => user.swaps)
  user: User;
}

import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { User } from "./user";
import { Swap } from "./swap";

@ObjectType()
@Entity()
export class Skill extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  type: number;

  @Field({ nullable: true })
  @Column({ type: "varchar", nullable: true })
  category: string;

  @ManyToMany(() => Swap, (swap) => swap.skills)
  swaps: Swap[];

  @ManyToOne(() => User, (user) => user.skills)
  user: User;
}

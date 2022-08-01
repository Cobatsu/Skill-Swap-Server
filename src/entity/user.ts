import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Skill } from "./skill";
import { Swap } from "./swap";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ type: "boolean", default: false })
  isProfileCreated: boolean;

  @OneToMany(() => Skill, (skill) => skill.user)
  skills: Skill[];

  @OneToMany(() => Skill, (swap) => swap.user)
  swaps: Swap[];
}

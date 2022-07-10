import { Resolver, Mutation, Arg, Query, Field, InputType, Ctx, ID, Authorized } from "type-graphql";
import {hash} from 'bcrypt'  
import {User} from '../entity/user'
import { AuthenticationError , ApolloError } from 'apollo-server-core' 
import {ContextType} from '../types/contextType'
import {getAuth} from '../firebase/firebase'

@InputType()
class RegisterInput {
    @Field()
    name:string;
    @Field()
    surname:string;
    @Field()
    email:string;
    @Field()
    password:string;
}


@Resolver(User)
class UserResolver {
  
  @Authorized()
  @Query(()=>User)
  async getCurrentUser(@Ctx() ctx:ContextType) : Promise<User> {  
    try {
     var user = await User.findOne({where:{
        id:ctx.userID
      }}) as User;
    } catch(err) {
        throw new ApolloError("Server Error")    
    }

    return user;
  }

  @Authorized()
  @Mutation(()=>User)
  async register(
    @Arg("user",()=>RegisterInput) user:RegisterInput,
    @Ctx() ctx:ContextType, 
  ) : Promise<User>{  

    try {
      const hashed = await hash(user.password,10);
      const createdUser = await User.create({
        id:ctx.userID,
        name:user.name,
        surname:user.surname,
        email:user.email,
        password:hashed
      }).save();
  
      return createdUser;
    } catch {
      throw new AuthenticationError("unauthorized request");
    }
  
  }

}


export default UserResolver;
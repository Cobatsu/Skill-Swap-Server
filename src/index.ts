import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { buildSchema, AuthChecker } from "type-graphql";
import { createConnection } from "typeorm";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  AuthenticationError,
} from "apollo-server-core";
import UserResolver from "./resolvers/userResolver";
import { ContextType } from "./types/contextType";
import * as cookieParser from "cookie-parser";
import { getAuth } from "./firebase/firebase";

//@ts-ignore
import * as cors from "cors";

const main = async () => {
  await createConnection();

  const customAuthChecker: AuthChecker<ContextType> = ({ context }, roles) => {
    if (roles.length == 0) {
      if (context.userID) return true;
    }

    return false;
  };

  const schema = await buildSchema({
    resolvers: [UserResolver],
    authChecker: customAuthChecker,
  });
  const apolloServer = new ApolloServer<ContextType>({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: async ({ req, res }) => {
      const jid = req.headers.authorization?.split(" ")[1] || "";
      const ctx: ContextType = { req, res };

      try {
        const user = await getAuth().verifyIdToken(jid);
        if (user) {
          ctx.userID = user.uid;
        }
      } catch (err) {
        console.log(err);
      }

      return ctx;
    },
  });

  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(cookieParser());
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main();

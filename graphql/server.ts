import path from "node:path";

import { ApolloServer, GraphQLRequestContext } from "@apollo/server";
import { GraphQLSchema, GraphQLDeferDirective, GraphQLStreamDirective, specifiedDirectives, buildSchema } from "graphql";
import { readFileSync } from "fs";

import { resolvers } from "@/graphql/resolvers";

const typeDefs = readFileSync(path.join(process.cwd(), "graphql/schema.graphql"), { encoding: "utf-8" });
const schema = buildSchema(typeDefs);

const loggingPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext: any) {
    console.log(
      "Request started! Query:\n" + requestContext.request.query,
      `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    );

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      async parsingDidStart(requestContext: any) {
        console.log("Parsing started!", `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      async validationDidStart(requestContext: any) {
        console.log("Validation started!", `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
      },
    };
  },
};

const schemaWithDeferAndResolvers = new GraphQLSchema({
  query: schema.getQueryType(),
  // mutation: schema.getMutationType(),
  // subscription: schema.getSubscriptionType(),
  // types: schema.getTypeMap(),
  directives: [
    ...specifiedDirectives,
    GraphQLDeferDirective,
    GraphQLStreamDirective,
    ...schema.getDirectives().filter((d) => !specifiedDirectives.includes(d)),
  ],
});

Object.keys(resolvers).forEach((typeName) => {
  const type = schemaWithDeferAndResolvers.getType(typeName);
  if (type && "getFields" in type) {
    const fields = type.getFields();
    //@ts-ignore
    Object.keys(resolvers[typeName]).forEach((fieldName) => {
      if (fields[fieldName]) {
        //@ts-ignore
        fields[fieldName].resolve = resolvers[typeName][fieldName];
      }
    });
  }
});

const server = new ApolloServer({
  schema: schemaWithDeferAndResolvers,
  introspection: true,
  allowBatchedHttpRequests: true,
  plugins: [loggingPlugin],
});

export { server };

import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer, GraphQLRequestContext } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";

import { books } from "@/data/books";

const resolvers = {
  Query: {
    books: () => books,
  },
};

const typeDefs = gql`
  type Query {
    books: [Book!]!
  }

  type Author {
    name: String!
  }

  type Book {
    id: ID!
    dateAdded: String!
    title: String!
    isbn: String!
    author: Author
  }
`;

const loggingPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext: any) {
    console.log("Request started! Query:\n" + requestContext.request.query);

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      async parsingDidStart(requestContext: any) {
        console.log("Parsing started!");
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      async validationDidStart(requestContext: any) {
        console.log("Validation started!");
      },
    };
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
  plugins: [loggingPlugin],
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (request) => {
    return request;
  },
});

export { handler as GET, handler as POST };

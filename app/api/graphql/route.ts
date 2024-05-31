import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer, GraphQLRequestContext } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";

import { books } from "@/data/books";

async function shortDelayedBooks(first: any, options: { offset?: number; limit?: number }) {
  await new Promise((res) => setTimeout(res, 200));

  console.log("what is first, second", first, options);

  const { offset, limit } = options;

  console.log("what is offset, limit", offset, limit);

  let paginatedBooks = books;
  if (typeof offset !== "undefined" && typeof limit !== "undefined") {
    const start = offset * limit;
    const end = start + limit;
    console.log("what is start and end?", start, end);
    paginatedBooks = books.slice(start, end);
  }

  return paginatedBooks;
}

async function longDelayedBooks() {
  await new Promise((res) => setTimeout(res, 1000));
  return books;
}

const resolvers = {
  Query: {
    books: () => books,
    shortDelayedBooks: shortDelayedBooks,
    longDelayedBooks: longDelayedBooks,
  },
};

const typeDefs = gql`
  type Query {
    books: [Book!]!
    shortDelayedBooks(offset: Int, limit: Int): [Book!]!
    longDelayedBooks: [Book!]!
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

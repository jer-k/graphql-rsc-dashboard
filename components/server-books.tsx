import { gql } from "graphql-tag";

import { Books } from "@/components/books";
import { getClient } from "@/graphql/rsc-client";

const DELAYED_BOOKS_QUERY = gql`
  query DelayedBooksQuery {
    longDelayedBooks {
      id
      title
      dateAdded
      isbn
      author {
        name
      }
    }
  }
`;

export async function ServerBooks() {
  const { data } = await getClient().query({ query: DELAYED_BOOKS_QUERY });
  return <Books books={data.longDelayedBooks} />;
}

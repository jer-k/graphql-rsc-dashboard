import { gql } from "graphql-tag";

import { Books } from "@/components/books";
import { getClient } from "@/graphql/client";

const BOOKS_QUERY = gql`
  query BooksQuery {
    books {
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

export const dynamic = "force-dynamic";
export default async function BooksPage() {
  const { data } = await getClient().query({ query: BOOKS_QUERY });

  return (
    <>
      <h1 className="text-black text-2xl mb-2">Books</h1>
      <Books books={data.books} />
    </>
  );
}

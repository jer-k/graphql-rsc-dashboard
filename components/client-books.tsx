"use client";

import { gql } from "graphql-tag";

import { useQuery } from "@apollo/client";

const DEFERRED_BOOKS_ONE_QUERY = gql`
  query DEFERRED_BOOKS_ONE_QUERY {
    books {
      id
      title
      dateAdded
      isbn
      author {
        name
      }
      ... @defer {
        stores {
          name
          address
        }
      }
    }
  }
`;

import type { Book as BookType } from "@/types/graphql";

import { Book } from "@/components/book";

export function ClientBooks() {
  const { data, loading, error } = useQuery(DEFERRED_BOOKS_ONE_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.books) return <p>No data available</p>;

  const books = data.books as BookType[];

  return (
    <div className="flex flex-col gap-2">
      {books.map((book) => {
        const stores = book.stores ?? [];
        return (
          <div key={book.title}>
            <Book book={book} />
            {stores.map((store) => (
              <div key={store.name} className="flex flex-row gap-2">
                <div className="text-black">{store.name}</div>
                <div className="text-black">{store.address}</div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

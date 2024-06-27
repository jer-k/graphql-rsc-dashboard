"use client";

import { gql } from "graphql-tag";

import { useQuery } from "@apollo/client";

const BOOKS_DEFERRED_STORES_QUERY = gql`
  query BOOKS_DEFERRED_STORES_QUERY($isbn: String!) {
    book(isbn: $isbn) {
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

type Props = {
  isbn: string;
};

export function ClientBookStores({ isbn }: Props) {
  const { data, loading, error } = useQuery(BOOKS_DEFERRED_STORES_QUERY, { variables: { isbn } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.books) return <p>No data available</p>;

  const book = data.book as BookType;
  const stores = book.stores ?? [];

  return (
    <div className="flex flex-col gap-2">
      <Book book={book} />
      {stores.map((store) => (
        <div key={store.name} className="flex flex-row gap-2">
          <div className="text-black">{store.name}</div>
          <div className="text-black">{store.address}</div>
        </div>
      ))}
    </div>
  );
}

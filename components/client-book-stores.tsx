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
        id
        name
      }
      ... @defer {
        stores {
          id
          name
        }
      }
    }
  }
`;

import type { Book as BookType } from "@/types/graphql";

import { Book } from "@/components/book";
import Link from "next/link";

type Props = {
  isbn: string;
  pagesRouter?: boolean;
};

export function ClientBookStores({ isbn, pagesRouter = false }: Props) {
  const { data, loading, error } = useQuery(BOOKS_DEFERRED_STORES_QUERY, {
    variables: { isbn },
    fetchPolicy: "cache-and-network",
  });

  const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
  console.log("what is data?", data, loading, currentTime);
  if (loading) return <p className="text-black">Loading...</p>;
  if (error) return <p className="text-black">Error: {error.message}</p>;
  if (!data || !data.book) return <p className="text-black">No data available</p>;

  const book = data.book as BookType;
  const stores = book.stores;

  return (
    <div className="flex flex-col gap-2">
      <Book book={book} />
      {stores === undefined ? (
        <div className="text-black">Loading Stores</div>
      ) : (
        stores && (
          <>
            {stores.map((store) => (
              <div key={store.name} className="flex flex-row gap-2">
                <div className="text-black">{store.name}</div>
                <div className="text-black">{store.address}</div>
              </div>
            ))}
            <Link
              className="text-blue-400"
              href={`/${pagesRouter ? "pages_router" : "client_components"}/books/${isbn}/deferred_stores_managers`}
            >
              Store With Managers
            </Link>
          </>
        )
      )}
    </div>
  );
}

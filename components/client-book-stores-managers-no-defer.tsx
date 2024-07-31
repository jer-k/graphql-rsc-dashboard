"use client";

import { gql } from "graphql-tag";

import { useQuery } from "@apollo/client";

const BOOKS_STORES_MANAGERS_QUERY = gql`
  query BOOKS_DEFERRED_STORES_MANAGERS_QUERY($isbn: String!) {
    book(isbn: $isbn) {
      id
      title
      dateAdded
      isbn
      author {
        id
        name
      }
      stores {
        id
        name
        address
        hours {
          monday
          tuesday
          wednesday
          thursday
          friday
          saturday
          sunday
        }
        managers {
          id
          name
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

export function ClientBookStoresManagers({ isbn }: Props) {
  const { data, loading, error } = useQuery(BOOKS_STORES_MANAGERS_QUERY, {
    variables: { isbn },
    fetchPolicy: "cache-and-network",
  });

  console.log("what is data?", data, loading);
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
        stores &&
        stores.map((store) => (
          <div key={store.name}>
            <div className="flex flex-row gap-2">
              <div className="text-black">{store.name}</div>
              <div className="text-black">{store.address}</div>
            </div>
            <div className="flex flex-column gap-2">
              <div className="text-black">{store.hours.monday}</div>
              <div className="text-black">{store.hours.tuesday}</div>
              <div className="text-black">{store.hours.wednesday}</div>
              <div className="text-black">{store.hours.thursday}</div>
              <div className="text-black">{store.hours.friday}</div>
              <div className="text-black">{store.hours.saturday}</div>
              <div className="text-black">{store.hours.sunday}</div>
            </div>
            <div className="text-black">Managers</div>
            <div className="flex flex-row gap-2">
              {(store.managers ?? []).map((manager) => (
                <div key={manager.name} className="text-black">
                  {manager.name}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

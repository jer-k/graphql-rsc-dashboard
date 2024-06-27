import Link from "next/link";

import type { Book as BookType } from "@/types/graphql";

type Props = {
  book: BookType;
};

export function Book({ book }: Props) {
  return (
    <div className="flex flex-col space-y-2 border-2 border-black p-2">
      <div className="text-black">Title: {book.title}</div>
      <div className="text-black">
        ISBN:{" "}
        <Link className="text-blue-400" href={`/books/${book.isbn}`}>
          {book.isbn}
        </Link>
      </div>
      <div className="text-black">Author: {book.author?.name ?? "None"}</div>
    </div>
  );
}

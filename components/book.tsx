import type { Book as BookType } from "@/types";
type Props = {
  book: BookType;
};

export function Book({ book }: Props) {
  return (
    <div className="flex flex-col space-y-2 border-2 border-black p-2">
      <div className="text-black">Title: {book.title}</div>
      <div className="text-black">ISBN: {book.isbn}</div>
      <div className="text-black">Author: {book.author?.name ?? "None"}</div>
    </div>
  );
}

import type { Book as BookType } from "@/types";

import { Book } from "@/components/book";

type Props = {
  books: BookType[];
};

export function Books({ books }: Props) {
  return (
    <div className="flex flex-col space-y-2">
      {books.map((book) => (
        <div key={book.title}>
          <Book book={book} />
        </div>
      ))}
    </div>
  );
}

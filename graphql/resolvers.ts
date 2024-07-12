import { books } from "@/data/books";
import { Book } from "@/types/graphql";

async function shortDelayedFindBook(first: any, options: { isbn: string }) {
  console.log("inside the short delayed book resolver, before await");
  await new Promise((res) => setTimeout(res, 200));

  const { isbn } = options;
  return books.find((book) => book.isbn === isbn);
}

async function shortDelayedBooks(first: any, options: { offset?: number; limit?: number }) {
  await new Promise((res) => setTimeout(res, 200));

  const { offset, limit } = options;

  let paginatedBooks = books;
  if (typeof offset !== "undefined" && typeof limit !== "undefined") {
    const start = offset * limit;
    const end = start + limit;
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
    book: shortDelayedFindBook,
    books: () => books,
    shortDelayedBooks: shortDelayedBooks,
    longDelayedBooks: longDelayedBooks,
  },
  Book: {
    stores: async (book: Book, _: unknown, __: unknown) => {
      console.log("inside the stores resolver, before await");
      await new Promise((res) => setTimeout(res, 2000));
      return book.stores;
    },
  },
};

export { resolvers };

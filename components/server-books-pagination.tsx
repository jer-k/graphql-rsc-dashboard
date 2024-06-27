import { gql } from "graphql-tag";

import { Books } from "@/components/books";
import { getClient } from "@/graphql/client";
import Link from "next/link";

const SERVER_PAGINATED_BOOKS_QUERY = gql`
  query ServerPaginatedBooksQuery($offset: Int, $limit: Int) {
    shortDelayedBooks(offset: $offset, limit: $limit) {
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

type Props = {
  page?: string;
};

export async function ServerBooksPagination({ page }: Props) {
  const intPage = parseInt(page || "0");

  const { data } = await getClient().query({
    query: SERVER_PAGINATED_BOOKS_QUERY,
    variables: {
      offset: intPage,
      limit: 2,
    },
  });

  const nextPage = intPage + 1;
  const prevPage = Math.max(intPage - 1, 0);

  return (
    <>
      <Books books={data.shortDelayedBooks} />
      <div className="flex flex-row items-center justify-center w-full mt-2 space-x-4">
        <Link className="text-black" href={`paginated_books?page=${prevPage}`}>
          Previous
        </Link>
        <Link className="text-black" href={`paginated_books?page=${nextPage}`}>
          Next
        </Link>
      </div>
    </>
  );
}

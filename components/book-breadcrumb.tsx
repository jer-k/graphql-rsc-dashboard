import { gql } from "graphql-tag";
import { getClient } from "@/graphql/client";

import Link from "next/link";

const BOOK_BREADCRUMB_QUERY = gql`
  query BookBreadcrumbQuery($isbn: String!) {
    book(isbn: $isbn) {
      id
      title
    }
  }
`;

type Props = {
  href: string;
  isbn: string;
  isItem: boolean;
};

export async function BookBreadcrumb({ href, isbn, isItem }: Props) {
  const { data } = await getClient().query({
    query: BOOK_BREADCRUMB_QUERY,
    variables: { isbn: isbn },
  });

  const bookTitle = data?.book?.title;

  if (!bookTitle) return null;

  return isItem ? (
    <>
      <Link className="text-gray-500" href={href}>
        {bookTitle}
      </Link>
      <span className="text-gray-500">|</span>
    </>
  ) : (
    <div className="text-gray-500">{bookTitle}</div>
  );
}

import { gql } from "graphql-tag";
import { getClient } from "@/lib/ApolloClient";

import { Book } from "@/components/book";

const BOOK_QUERY = gql`
  query BookQuery($isbn: String!) {
    book(isbn: $isbn) {
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
  isbn: string;
};

export async function ServerBook({ isbn }: Props) {
  const { data } = await getClient().query({
    query: BOOK_QUERY,
    variables: { isbn: isbn },
  });

  if (!data.book) return <div>Not Found</div>;

  return <Book book={data.book} />;
}

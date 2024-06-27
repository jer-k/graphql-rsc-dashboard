/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query BooksQuery {\n    books {\n      id\n      title\n      dateAdded\n      isbn\n      author {\n        name\n      }\n    }\n  }\n": types.BooksQueryDocument,
    "\n  query DEFERRED_BOOKS_ONE_QUERY {\n    books {\n      id\n      title\n      dateAdded\n      isbn\n      author {\n        name\n      }\n      ... @defer {\n        stores {\n          name\n          address\n        }\n      }\n    }\n  }\n": types.Deferred_Books_One_QueryDocument,
    "\n  query BookBreadcrumbQuery($isbn: String!) {\n    book(isbn: $isbn) {\n      id\n      title\n    }\n  }\n": types.BookBreadcrumbQueryDocument,
    "\n  query BookQuery($isbn: String!) {\n    book(isbn: $isbn) {\n      id\n      title\n      dateAdded\n      isbn\n      author {\n        name\n      }\n    }\n  }\n": types.BookQueryDocument,
    "\n  query ServerPaginatedBooksQuery($offset: Int, $limit: Int) {\n    shortDelayedBooks(offset: $offset, limit: $limit) {\n      id\n      title\n      dateAdded\n      isbn\n      author {\n        name\n      }\n    }\n  }\n": types.ServerPaginatedBooksQueryDocument,
    "\n  query DelayedBooksQuery {\n    longDelayedBooks {\n      id\n      title\n      dateAdded\n      isbn\n      author {\n        name\n      }\n    }\n  }\n": types.DelayedBooksQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BooksQuery {\n    books {\n      id\n      title\n      dateAdded\n      isbn\n      author {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query BooksQuery {\n    books {\n      id\n      title\n      dateAdded\n      isbn\n      author {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DEFERRED_BOOKS_ONE_QUERY {\n    books {\n      id\n      title\n      dateAdded\n      isbn\n      author {\n        name\n      }\n      ... @defer {\n        stores {\n          name\n          address\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query DEFERRED_BOOKS_ONE_QUERY {\n    books {\n      id\n      title\n      dateAdded\n      isbn\n      author {\n        name\n      }\n      ... @defer {\n        stores {\n          name\n          address\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BookBreadcrumbQuery($isbn: String!) {\n    book(isbn: $isbn) {\n      id\n      title\n    }\n  }\n"): (typeof documents)["\n  query BookBreadcrumbQuery($isbn: String!) {\n    book(isbn: $isbn) {\n      id\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BookQuery($isbn: String!) {\n    book(isbn: $isbn) {\n      id\n      title\n      dateAdded\n      isbn\n      author {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query BookQuery($isbn: String!) {\n    book(isbn: $isbn) {\n      id\n      title\n      dateAdded\n      isbn\n      author {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ServerPaginatedBooksQuery($offset: Int, $limit: Int) {\n    shortDelayedBooks(offset: $offset, limit: $limit) {\n      id\n      title\n      dateAdded\n      isbn\n      author {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query ServerPaginatedBooksQuery($offset: Int, $limit: Int) {\n    shortDelayedBooks(offset: $offset, limit: $limit) {\n      id\n      title\n      dateAdded\n      isbn\n      author {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DelayedBooksQuery {\n    longDelayedBooks {\n      id\n      title\n      dateAdded\n      isbn\n      author {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query DelayedBooksQuery {\n    longDelayedBooks {\n      id\n      title\n      dateAdded\n      isbn\n      author {\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
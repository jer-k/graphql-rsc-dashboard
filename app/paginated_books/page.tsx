import { Suspense } from "react";
import { ServerBooksPagination } from "@/components/server-books-pagination";

type Props = {
  searchParams: {
    page?: string;
  };
};

export default async function BooksPage({ searchParams }: Props) {
  return (
    <>
      <h1 className="text-black text-2xl mb-2">200ms delayed Books with server driven pagination</h1>
      <Suspense fallback={<h3 className="text-black text-xl">Loading!</h3>}>
        <ServerBooksPagination page={searchParams.page} />
      </Suspense>
    </>
  );
}

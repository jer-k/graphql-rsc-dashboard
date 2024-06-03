import { Suspense } from "react";

import { ServerBook } from "@/components/server-book";

type Props = {
  params: {
    isbn: string;
  };
};

export default async function BooksPage({ params: { isbn } }: Props) {
  return (
    <>
      <h1 className="text-black text-2xl mb-2">200ms delayed Book</h1>
      <Suspense fallback={<h3 className="text-black text-xl">Loading!</h3>}>
        <ServerBook isbn={isbn} />
      </Suspense>
    </>
  );
}

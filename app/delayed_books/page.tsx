import { Suspense } from "react";
import { ServerBooks } from "@/components/server-books";

export default async function BooksPage() {
  return (
    <>
      <h1 className="text-black text-2xl mb-2">1 second delayed Books</h1>
      <Suspense fallback={<h3 className="text-black text-xl">Loading!</h3>}>
        <ServerBooks />
      </Suspense>
    </>
  );
}

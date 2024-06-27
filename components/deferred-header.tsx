import Link from "next/link";

export function DeferredHeader() {
  return (
    <div className="flex flex-row space-x-4 mb-2 items-center justify-start border-b-2 border-black w-full">
      <Link className="text-black" href="/client_components/deferred_books_one">
        (CC) Books + Deferred Stores (no Managers)
      </Link>
      <Link className="text-black" href="/client_components/deferred_books_two">
        (CC) Books + Deferred Stores + Managers
      </Link>
    </div>
  );
}

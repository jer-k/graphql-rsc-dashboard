import Link from "next/link";

export function Header() {
  return (
    <div className="flex flex-row space-x-2 mb-2 items-center justify-start border-b-2 border-black w-full">
      <Link className="text-black" href="/">
        Home
      </Link>
      <Link className="text-black" href="/books">
        Books
      </Link>
      <Link className="text-black" href="/delayed_books">
        Delayed Books
      </Link>
    </div>
  );
}

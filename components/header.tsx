import Link from "next/link";

export function Header() {
  return (
    <div className="flex flex-row space-x-4 mb-2 items-center justify-start border-b-2 border-black w-full">
      <Link className="text-black" href="/">
        Home
      </Link>
      <Link className="text-black" href="/books">
        RSC
      </Link>
      <Link className="text-black" href="/delayed_books">
        RSC Long Delay
      </Link>
      <Link className="text-black" href="/paginated_books">
        RSC Pagination
      </Link>
    </div>
  );
}

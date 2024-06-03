import Link from "next/link";

export default function DefaultSlot(p: any) {
  console.log("rendering in default", p);
  return (
    <div className="flex flex-row space-x-4 mb-2 items-center justify-start border-b-2 border-gray-500 w-full">
      <Link className="text-gray-500" href="/">
        Home
      </Link>
    </div>
  );
}

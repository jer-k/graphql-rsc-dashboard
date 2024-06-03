import React, { ReactElement, Suspense } from "react";
import Link from "next/link";

type Props = {
  params: {
    catchAll: string[];
  };
};

export default function BreadcrumbSlot({ params: { catchAll } }: Props) {
  console.log("rendering in @breadcrumbs / BreadcrumbSlot", catchAll);

  let fullHref: string | undefined = undefined;
  const breadcrumbItems: ReactElement[] = [];
  let breadcrumbPage: ReactElement = <></>;

  for (let i = 0; i < catchAll.length; i++) {
    const route = catchAll[i];
    let href;

    href = fullHref ? `${fullHref}/${route}` : `/${route}`;
    fullHref = href;

    if (i === catchAll.length - 1) {
      breadcrumbPage = <div className="text-gray-500">{route}</div>;
    } else {
      breadcrumbItems.push(
        <React.Fragment key={href}>
          <Link className="text-gray-500" href={href}>
            {route}
          </Link>
          <span className="text-gray-500">|</span>
        </React.Fragment>,
      );
    }
  }

  return (
    <div className="flex flex-row space-x-4 mb-2 items-center justify-start border-b-2 border-gray-500 w-full">
      <Link className="text-gray-500" href="/">
        Home |
      </Link>
      <Suspense>
        {breadcrumbItems}
        {breadcrumbPage}
      </Suspense>
    </div>
  );
}

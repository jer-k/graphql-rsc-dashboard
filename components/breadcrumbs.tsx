import React, { ReactElement, Suspense } from "react";
import Link from "next/link";

import { BookBreadcrumb } from "./book-breadcrumb";

type Props = {
  breadcrumbs: string[];
};

export function Breadcrumbs({ breadcrumbs }: Props) {
  let fullHref: string | undefined = undefined;
  const breadcrumbItems: ReactElement[] = [];
  let breadcrumbPage: ReactElement = <></>;

  for (let i = 0; i < breadcrumbs.length; i++) {
    const route = breadcrumbs[i];
    let href;

    href = fullHref ? `${fullHref}/${route}` : `/${route}`;
    fullHref = href;

    const isBook = /\/books\/\d+/.test(fullHref);

    if (i === breadcrumbs.length - 1) {
      breadcrumbPage = isBook ? (
        <BookBreadcrumb href={fullHref} isbn={route} isItem={false} />
      ) : (
        <div className="text-gray-500">{route}</div>
      );
    } else {
      const item = isBook ? (
        <BookBreadcrumb isItem href={fullHref} isbn={route} />
      ) : (
        <React.Fragment key={href}>
          <Link className="text-gray-500" href={href}>
            {route}
          </Link>
          <span className="text-gray-500">|</span>
        </React.Fragment>
      );
      breadcrumbItems.push(item);
    }
  }

  return (
    <div className="flex flex-row space-x-4 mb-2 items-center justify-start border-b-2 border-gray-500 w-full">
      <>
        <Link className="text-gray-500" href="/">
          Home
        </Link>
        <span className="text-gray-500">|</span>
      </>
      <Suspense>
        {breadcrumbItems}
        {breadcrumbPage}
      </Suspense>
    </div>
  );
}

"use client";

import { PropsWithChildren } from "react";

import { getClient } from "./cc-client";

import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";

export function ApolloWrapper({ children }: PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={getClient}>{children}</ApolloNextAppProvider>;
}

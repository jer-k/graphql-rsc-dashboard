import { ApolloProvider } from "@apollo/client";

import { useApollo } from "@/graphql/pages-client";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

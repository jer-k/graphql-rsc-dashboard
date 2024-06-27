import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";

import { server } from "@/graphql/server";

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (request) => {
    return request;
  },
});

export { handler as GET, handler as POST };

import { startServerAndCreateNextHandler } from "@as-integrations/next/src";

import { server } from "@/graphql/server";

export default startServerAndCreateNextHandler(server);

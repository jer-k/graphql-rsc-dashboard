import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./graphql/schema.graphql",
  documents: "**/*.tsx",
  generates: {
    "types/": {
      preset: "client",
      plugins: ["typescript-resolvers"],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;

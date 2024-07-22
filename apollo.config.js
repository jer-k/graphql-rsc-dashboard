module.exports = {
  client: {
    tagName: "graphql",
    service: {
      name: "graphql-rsc-dashboard",
      localSchemaFile: "./graphql/schema.graphql",
    },
    skipSSLValidation: true,
    excludes: [],
    includes: ["**/*.{ts,gql,tsx,graphql}"],
  },
  service: {
    localSchemaFile: "./graphql/schema.graphql"
  }
};

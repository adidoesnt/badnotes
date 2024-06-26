import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { health } from "./health";

const { typeDefs: healthTypeDefs, resolvers: healthResolvers } = health;

const typeDefs = mergeTypeDefs([healthTypeDefs]);
const resolvers = mergeResolvers([healthResolvers]);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;

import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { health } from "gql/health";
import { user } from "gql/user";
import { note } from "gql/note";

const { typeDefs: healthTypeDefs, resolvers: healthResolvers } = health;
const { typeDefs: userTypeDefs, resolvers: userResolvers } = user;
const { typeDefs: noteTypeDefs, resolvers: noteResolvers } = note;

const typeDefs = mergeTypeDefs([healthTypeDefs, userTypeDefs, noteTypeDefs]);
const resolvers = mergeResolvers([
    healthResolvers,
    userResolvers,
    noteResolvers,
]);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;

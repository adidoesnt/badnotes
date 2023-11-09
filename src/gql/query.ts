import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";

const QueryRoot = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        hello: {
            type: GraphQLString,
            resolve: () => "Sanity check ok",
        },
    }),
});

export const schema = new GraphQLSchema({ query: QueryRoot });

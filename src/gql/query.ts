import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} from "graphql";
import { findAllNotes, findAllUsers } from "../repository/read";
import { NoteType, UserType } from "./types";

const QueryRoot = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        health: {
            type: GraphQLString,
            resolve: () => "Sanity check ok",
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: async () => await findAllUsers(),
        },
        notes: {
            type: new GraphQLList(NoteType),
            resolve: async () => await findAllNotes(),
        },
    }),
});

export const schema = new GraphQLSchema({ query: QueryRoot });

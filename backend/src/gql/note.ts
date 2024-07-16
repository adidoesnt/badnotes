import { gql } from "apollo-server-express";
import type { Schema } from "gql/types";
import { noteService } from "neo4j/service";

export const note: Schema = {
    typeDefs: gql`
        type Note {
            uid: ID!
            title: String!
            content: String!
            author: User!
            createdAt: String!
            updatedAt: String!
        }

        type Query {
            userNotes(username: String!): [Note!]
        }

        type Mutation {
            note(title: String!, content: String!, author: String!): Note!
        }
    `,
    resolvers: {
        Query: {
            userNotes: async (_, { username }) => {
                return await noteService.getNotesByUser({ username });
            },
        },
    },
};

import { gql } from "apollo-server-express";
import type { Schema } from "gql/types";

export const note: Schema = {
    typeDefs: gql`
        type Note {
            uid: ID!
            title: String!
            content: String!
            author: User!
            createdAt: String!
            lastUpdatedAt: String!
        }

        type Query {
            getNote(uid: ID!): Note
            getNotes: [Note!]
        }

        type Mutation {
            createNote(title: String!, content: String!, author: String!): Note!
        }
    `,
    resolvers: {},
};

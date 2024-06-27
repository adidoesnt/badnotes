import { gql } from "apollo-server-express";
import type { Schema } from "gql/types";

export const user: Schema = {
    typeDefs: gql`
        type User {
            username: String!
            passwordHash: String!
            createdAt: String!
            updatedAt: String!
        }

        type Query {
            getUser(username: String!): User
            getUsers: [User!]
        }

        type Mutation {
            createUser(username: String!, passwordHash: String!): User!
        }
    `,
    resolvers: {},
};

import { gql } from "apollo-server-express";
import type { Schema } from "gql/types";
import { userService } from "neo4j/service";

export const user: Schema = {
    typeDefs: gql`
        type User {
            username: String!
            password: String!
            createdAt: String!
            updatedAt: String!
        }

        type Query {
            user(username: String!): User
            users: [User!]
        }

        type Mutation {
            user(username: String!, password: String!): User
        }
    `,
    resolvers: {
        Query: {
            user: async (_, { username }) => {
                return await userService.getUser({ username });
            },
            users: async () => {
                return await userService.getAllUsers();
            },
        },
        Mutation: {
            user: async (_, { username, password }) => {
                return await userService.createUser({ username, password });
            },
        },
    },
};

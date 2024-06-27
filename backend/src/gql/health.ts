import { gql } from "apollo-server-express";
import type { Schema } from "gql/types";

export const health: Schema = {
    typeDefs: gql`
        type HealthStatus {
            status: Int!
            message: String!
        }

        type Query {
            health: HealthStatus
        }
    `,
    resolvers: {
        Query: {
            health: () => ({
                status: 200,
                message: "OK",
            }),
        },
    },
};

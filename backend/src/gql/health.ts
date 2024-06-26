import { gql } from "apollo-server-express";

export const health = {
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

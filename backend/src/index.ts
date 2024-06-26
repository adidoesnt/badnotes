import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "gql";
import { healthCheck, neode } from "neo4j";

const { PORT = 4000 } = process.env;

try {
    await healthCheck();

    const server = new ApolloServer({
        schema,
        context: ({ req }) => ({ neode, req }),
    });

    const app = express();
    await server.start();

    server.applyMiddleware({ app, path: "/api" });

    app.listen({ port: PORT }, () => {
        console.log(
            `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
        );
    });
} catch (e) {
    const error = e as Error;
    const { message = "Failed to start server" } = error;
    console.error("Failed to start server", { message });
}

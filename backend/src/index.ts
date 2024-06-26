import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./gql";

const { PORT = 4000 } = process.env;

const server = new ApolloServer({ schema });

const app = express();
await server.start();

server.applyMiddleware({ app, path: "/api" });

app.listen({ port: PORT }, () => {
    console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
    );
});

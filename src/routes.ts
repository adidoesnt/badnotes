import { Express, Request, Router, Response } from "express";
import { findAll } from "./controller/read";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./gql/query";

const { NODE_ENV } = process.env;

export const initRoutes = (app: Express) => {
    const router = Router();
    router.get(
        "/all",
        async (request: Request, response: Response) =>
            await findAll(request, response)
    );
    router.use(
        "/health",
        graphqlHTTP({
            schema,
            graphiql: NODE_ENV === "DEV",
        })
    );
    app.use("/", router);
};

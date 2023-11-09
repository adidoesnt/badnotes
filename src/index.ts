import express from 'express';
import { json, urlencoded } from 'body-parser';
import { schema } from '@gql/query';
import { graphqlHTTP } from 'express-graphql';
import { cache } from '@cache';

const { NODE_ENV } = process.env;

const { SERVER_PORT } = process.env;
const PORT = SERVER_PORT ?? 8080;

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
    '/',
    graphqlHTTP({
        schema,
        graphiql: NODE_ENV === 'DEV'
    })
);

app.listen(PORT, () => {
    cache.connect();
    console.log(`badnotes server listening on port ${PORT}`);
});

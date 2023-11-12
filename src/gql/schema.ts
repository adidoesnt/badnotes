import { GraphQLSchema } from 'graphql';
import { QueryRoot } from './query';
import { MutationRoot } from './mutation';

export const schema = new GraphQLSchema({
    query: QueryRoot,
    mutation: MutationRoot
});

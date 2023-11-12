import { UserController } from '@controller';
import { GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from './types';

export const MutationRoot = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        health: {
            type: GraphQLString,
            resolve: () => 'Sanity check ok'
        },
        createUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString }
            },
            resolve: UserController.createUserController
        }
    })
});

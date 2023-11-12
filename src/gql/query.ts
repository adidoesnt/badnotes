import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} from 'graphql';
import { NoteType, UserType } from '@gql/types';
import { UserController, NoteController } from '@controller';

export const QueryRoot = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        health: {
            type: GraphQLString,
            resolve: () => 'Sanity check ok'
        },
        users: {
            type: new GraphQLList(UserType),
            args: {
                username: { type: GraphQLString },
                uuid: { type: GraphQLString }
            },
            resolve: UserController.findUserController
        },
        notes: {
            type: new GraphQLList(NoteType),
            args: {
                title: { type: GraphQLString },
                content: { type: GraphQLString },
                uid: { type: GraphQLString }
            },
            resolve: NoteController.findNoteController
        }
    })
});


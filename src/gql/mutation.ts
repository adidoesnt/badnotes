import { NoteController, UserController } from '@controller';
import { GraphQLObjectType, GraphQLString } from 'graphql';
import { NoteType, UserType } from './types';

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
        },
        updateUser: {
            type: UserType,
            args: {
                uuid: { type: GraphQLString },
                username: { type: GraphQLString }
            },
            resolve: UserController.updateUserController
        },
        createNote: {
            type: NoteType,
            args: {
                uuid: { type: GraphQLString },
                title: { type: GraphQLString },
                content: { type: GraphQLString }
            },
            resolve: NoteController.createUserNoteController
        }
    })
});

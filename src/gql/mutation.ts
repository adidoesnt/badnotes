import { NoteController, UserController } from '@controller';
import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
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
        addFriend: {
            type: new GraphQLList(UserType),
            args: {
                uuid1: { type: GraphQLString },
                uuid2: { type: GraphQLString }
            },
            resolve: UserController.addFriendController
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
        },
        updateNote: {
            type: NoteType,
            args: {
                uid: { type: GraphQLString },
                title: { type: GraphQLString },
                content: { type: GraphQLString }
            },
            resolve: NoteController.updateNoteController
        }
    })
});

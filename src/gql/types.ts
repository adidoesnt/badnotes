import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import { User, Note } from '@types'
import { NoteController, UserController } from '@controller'

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        username: {
            type: GraphQLString,
            resolve: (user: User) => user.username
        },
        uuid: {
            type: GraphQLString,
            resolve: (user: User) => user.uuid
        },
        notes: {
            type: new GraphQLList(NoteType),
            resolve: NoteController.getUserNotesController
        }
    })
})

export const NoteType = new GraphQLObjectType({
    name: 'Note',
    fields: () => ({
        title: {
            type: GraphQLString,
            resolve: (note: Note) => note.title
        },
        content: {
            type: GraphQLString,
            resolve: (note: Note) => note.content
        },
        uid: {
            type: GraphQLString,
            resolve: (note: Note) => note.uid
        }
    })
})

import { GraphQLObjectType, GraphQLString } from "graphql";
import { User, Note } from "@types";

export const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        username: {
            type: GraphQLString,
            resolve: (user: User) => user.username,
        },
        uuid: {
            type: GraphQLString,
            resolve: (user: User) => user.uuid,
        },
    }),
});

export const NoteType = new GraphQLObjectType({
    name: "Note",
    fields: () => ({
        title: {
            type: GraphQLString,
            resolve: (note: Note) => note.title,
        },
        content: {
            type: GraphQLString,
            resolve: (note: Note) => note.content,
        },
        uid: {
            type: GraphQLString,
            resolve: (note: Note) => note.uid,
        },
    }),
});

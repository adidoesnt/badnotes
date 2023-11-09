import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} from "graphql";
import { findAllNotes, findAllUsers } from "@repository";
import { NoteType, UserType } from "@gql/types";
import { Note, User } from "@types";
import {
    findByUUID,
    findByUsername,
    findByContent,
    findByTitle,
    findByUID,
} from "@service";

const QueryRoot = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        health: {
            type: GraphQLString,
            resolve: () => "Sanity check ok",
        },
        users: {
            type: new GraphQLList(UserType),
            args: {
                username: { type: GraphQLString },
                uuid: { type: GraphQLString },
            },
            resolve: async (_, args) => {
                const users = (await findAllUsers()) as unknown as Array<User>;
                const { username, uuid } = args;
                if (uuid) return findByUUID(users, uuid);
                if (username) return findByUsername(users, username);
                return users;
            },
        },
        notes: {
            type: new GraphQLList(NoteType),
            args: {
                title: { type: GraphQLString },
                content: { type: GraphQLString },
                uid: { type: GraphQLString },
            },
            resolve: async (_, args) => {
                const notes = (await findAllNotes()) as unknown as Array<Note>;
                const { title, content, uid } = args;
                if (uid) return findByUID(notes, uid);
                if (title) return findByTitle(notes, title);
                if (content) return findByContent(notes, content);
                return notes;
            },
        },
    }),
});

export const schema = new GraphQLSchema({ query: QueryRoot });

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { NoteType, UserType } from "@gql/types";
import { findUserController, findNoteController } from "@controller";

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
      resolve: findUserController,
    },
    notes: {
      type: new GraphQLList(NoteType),
      args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        uid: { type: GraphQLString },
      },
      resolve: findNoteController,
    },
  }),
});

export const schema = new GraphQLSchema({ query: QueryRoot });

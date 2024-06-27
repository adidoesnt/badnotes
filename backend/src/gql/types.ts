import { type DocumentNode } from "graphql";
import { type IResolvers } from "@graphql-tools/utils";

export type Maybe<T> = T | null | undefined;

export type Schema = {
    typeDefs: DocumentNode;
    resolvers: Maybe<IResolvers<unknown, unknown>>;
};

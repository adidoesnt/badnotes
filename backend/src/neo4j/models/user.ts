import { neode } from "neo4j/driver";
import type { NodeProperty, PropertyType, SchemaObject } from "neode";

export type User = typeof userSchema;

export const userSchema = {
    username: {
        primary: true,
        unique: true,
        required: true,
        type: "string" as PropertyType,
    } as NodeProperty,
    password: {
        type: "string" as PropertyType,
        required: true,
    } as NodeProperty,
    createdAt: {
        type: "datetime" as PropertyType,
        default: () => new Date(),
    } as NodeProperty,
    updatedAt: {
        type: "datetime" as PropertyType,
        default: () => new Date(),
    } as NodeProperty,
} as SchemaObject;

export const UserModel = neode.model<User>("User", userSchema);

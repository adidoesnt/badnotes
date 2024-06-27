import type Neode from "neode";
import type { NodeProperty, PropertyType, SchemaObject } from "neode";
import { v4 as uuidv4 } from "uuid";

export type User = typeof userSchema;

export const userSchema = {
    id: {
        primary: true,
        type: "string" as PropertyType,
        default: () => uuidv4(),
    } as NodeProperty,
    username: {
        type: "string" as PropertyType,
        required: true,
        unique: true,
    } as NodeProperty,
    passwordHash: {
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

export default (neode: Neode) => neode.model<User>("User", userSchema);

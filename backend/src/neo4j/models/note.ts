import type Neode from "neode";
import type { NodeProperty, PropertyType, SchemaObject } from "neode";
import { v4 as uuidv4 } from "uuid";

export type Note = typeof noteSchema;

export const noteSchema = {
    id: {
        primary: true,
        type: "string" as PropertyType,
        default: () => uuidv4(),
    } as NodeProperty,
    title: {
        type: "string" as PropertyType,
        required: true,
    } as NodeProperty,
    content: {
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
    author: {
        type: "relationship" as PropertyType,
        relationship: "AUTHORED",
        direction: "in",
        target: "User",
        cascade: "detach",
        properties: {},
        eager: true,
        required: false,
    } as NodeProperty | undefined,
} as SchemaObject;

export default (neode: Neode) => neode.model<Note>("Note", noteSchema);

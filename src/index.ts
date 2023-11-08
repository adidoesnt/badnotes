import { Entity, findAll } from "./db/db";

const { USER, NOTE } = Entity;

const users = await findAll(USER);
const notes = await findAll(NOTE);
console.log({ users }, { notes });

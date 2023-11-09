import { Note } from './note';

export type User = {
    username: string;
    uuid: string;
    notes?: Array<Note>;
};

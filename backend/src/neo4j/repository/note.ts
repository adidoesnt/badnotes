import { NoteModel, type Note } from "neo4j/models";
import { Logger } from "utils";
import { relative } from "path";
import type { FindOptions } from "neo4j/repository/types";
import { neode } from "neo4j/driver";

const logger = new Logger({
    module: relative(process.cwd(), __filename),
});

export type FindNoteOptions = FindOptions<Note>;

// TODO: Add relationship to user
export const createNote = async (data: Note) => {
    try {
        const note = await NoteModel.create(data);
        const noteObj = await note.toJson();
        logger.info("Note created", { note: noteObj });
        return noteObj;
    } catch (e) {
        const error = e as Error;
        const { message } = error;
        logger.error("Error creating note", { message });
    }
};

export const getNote = async ({ uid }: { uid: string }) => {
    try {
        const note = await NoteModel.find(uid);
        const noteObj = await note.toJson();
        logger.info("Note found", { note: noteObj });
        return noteObj;
    } catch (e) {
        const error = e as Error;
        logger.error("Error getting note by uid", error);
    }
};

export const getNotes = async (options?: FindNoteOptions) => {
    try {
        const notes = await NoteModel.all(options);
        const notesObj = await notes.toJson();
        logger.info("Notes found", { notes: notesObj });
        return notesObj;
    } catch (e) {
        const error = e as Error;
        logger.error("Error getting notes", error);
    }
};

export const getUserNotes = async (username: string) => {
    try {
        const query = `MATCH (u:User)-[:AUTHORED]->(n:Note) WHERE u.username = $username RETURN n`;
        const notes = await neode.cypher(query, { username });
        const notesObj: Array<Note> = notes.records.map((record) =>
            record.get("n"),
        );
        logger.info("Notes found", { notes: notesObj });
        return notesObj;
    } catch (e) {
        const error = e as Error;
        logger.error("Error getting notes", error);
    }
};

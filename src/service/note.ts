import { NoteRepository } from '@repository';
import { Note } from '@types';
import { v4 as uuidv4 } from 'uuid';

export class NoteService {
    static findAllNotes = async () => await NoteRepository.findAllNotes();

    static findByUID = async (notes: Note[], uid: string) => {
        if (uid) return notes.filter((note) => note.uid === uid);
    };

    static findByTitle = async (notes: Note[], title: string) => {
        if (title) return notes.filter((note) => note.title.includes(title));
    };

    static findByContent = async (notes: Note[], content: string) => {
        if (content)
            return notes.filter((note) => note.content.includes(content));
    };

    static findByUserUUID = async (uuid: string) => {
        return await NoteRepository.findByUserUUID(uuid);
    };

    static createByUserUUID = async (
        uuid: string,
        title: string,
        content: string
    ) => {
        const time = new Date();
        const utc = time.toISOString();
        const uid = uuidv4();
        return await NoteRepository.createNoteByUserUUID(
            uuid,
            uid,
            title,
            content,
            utc
        );
    };

    static updateByUID = async (
        uid: string,
        title?: string,
        content?: string
    ) => {
        if (!title && !content) return null;
        const updates = {
            title,
            content
        };
        return await NoteRepository.updateNoteByUID(uid, updates);
    };
}

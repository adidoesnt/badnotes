import { NoteRepository } from '@repository';
import { Note } from '@types';

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
}

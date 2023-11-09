import { NoteService } from '@service';
import { Note, User } from '@types';

export class NoteController {
    static findNoteController = async (
        _: any,
        args: Record<string, string>
    ) => {
        const notes =
            (await NoteService.findAllNotes()) as unknown as Array<Note>;
        const { title, content, uid } = args;
        if (uid) return NoteService.findByUID(notes, uid);
        if (title) return NoteService.findByTitle(notes, title);
        if (content) return NoteService.findByContent(notes, content);
        return notes;
    };

    static getUserNotesController = async (
        parent: User,
        _: Record<string, string>
    ) => {
        const { uuid } = parent;
        if (uuid) return await NoteService.findByUserUUID(uuid);
        return [];
    };
}

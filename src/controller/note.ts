import { findAllNotes } from "@repository";
import { findByContent, findByTitle, findByUID } from "@service";
import { Note } from "@types";

export const findNoteController = async (
  _: any,
  args: Record<string, string>
) => {
  const notes = (await findAllNotes()) as unknown as Array<Note>;
  const { title, content, uid } = args;
  if (uid) return findByUID(notes, uid);
  if (title) return findByTitle(notes, title);
  if (content) return findByContent(notes, content);
  return notes;
};

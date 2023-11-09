import { Note } from "../types";

export const findByUID = async (notes: Note[], uid: string) => {
    if (uid) return notes.filter((note) => note.uid === uid);
};

export const findByTitle = async (notes: Note[], title: string) => {
    if (title) return notes.filter((note) => note.title.includes(title));
};

export const findByContent = async (notes: Note[], content: string) => {
    if (content) return notes.filter((note) => note.content.includes(content));
};

export const NOTE_TAGS = [
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
    "Todo",
] as const;

export type NoteTag = typeof NOTE_TAGS[number];

export type Note = {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    tag: NoteTag;
};
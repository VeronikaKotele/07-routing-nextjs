export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export type Note = {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    tag: NoteTag;
};
import type { Note, NoteTag } from "../types/note";
import axios from "axios";

const BASE_URL = "https://notehub-public.goit.study/api/notes";

type SortBy = 'created' | 'updated';

const HEADER_WITH_AUTHORIZATION = {
    headers: {
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
    },
};

interface FetchNotesParams {
    search?: string;
    tag?: NoteTag;
    page?: number;
    perPage?: number;
    sortBy?: SortBy;
}

interface FetchNotesHttpResponse {
    notes: Note[];
    totalPages: number;
}

export const fetchNotes = async (
    params: FetchNotesParams
): Promise<FetchNotesHttpResponse> => {
    let url = `${BASE_URL}?page=${params.page ?? 1}&perPage=${params.perPage ?? 12}`;
    if (params.search) {
        url += `&search=${params.search}`;
    }
    if (params.tag) {
        url += `&tag=${params.tag}`;
    }
    if (params.sortBy) {
        url += `&sortBy=${params.sortBy}`;
    }

    const response = await axios.get<FetchNotesHttpResponse>(
        url,
        HEADER_WITH_AUTHORIZATION
    );

    return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const response = await axios.get<Note>(
        `${BASE_URL}/${id}`,
        HEADER_WITH_AUTHORIZATION
    );
    return response.data;
};

export interface CreateNoteParams {
    title: string;
    content: string;
    tag: NoteTag;
}

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
    const response = await axios.post<Note>(
        BASE_URL,
        note,
        HEADER_WITH_AUTHORIZATION
    );
    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await axios.delete<Note>(
        `${BASE_URL}/${id}`,
        HEADER_WITH_AUTHORIZATION
    );
    return response.data;
};

export type Category = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};

export const getCategories = async () => {
    const res = await axios<Category[]>(`${BASE_URL}/categories`, HEADER_WITH_AUTHORIZATION);
    return res.data;
};
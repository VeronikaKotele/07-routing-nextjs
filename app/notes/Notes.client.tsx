"use client";

import { useState } from "react";
import {
    useQuery,
    keepPreviousData,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { fetchNotes, createNote, deleteNote } from "@/lib/api";
import type { CreateNoteParams } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList"
import NoteForm from "@/components/NoteForm/NoteForm";
import Pagination from "@/components/Pagination/Pagination";
import css from "./NotesPage.module.css";
import Modal from "@/components/Modal/Modal";

function NotesClient() {
    const [currentQuery, setCurrentQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [openNoteForm, setOpenNoteForm] = useState(false);

    const onNoteFormClose = () => setOpenNoteForm(false);

    const onSubmitNewNoteForm = (newNote: CreateNoteParams) => {
        handleCreateNote(newNote);
        setOpenNoteForm(false);
    };

    const queryClient = useQueryClient();

    const createNoteMutation = useMutation({
        mutationFn: async (newNote: CreateNoteParams) => {
            const res = await createNote(newNote);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });

    const deleteNoteMutation = useMutation({
        mutationFn: async (noteId: string) => {
            const res = await deleteNote(noteId);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });

    const handleCreateNote = (newNote: CreateNoteParams) => {
        createNoteMutation.mutate(newNote);
    };

    const handleDeleteNote = async (noteId: string) => {
        deleteNoteMutation.mutate(noteId);
    };

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["notes", currentQuery, currentPage],
        queryFn: () => fetchNotes({ page: currentPage, search: currentQuery! }),
        enabled: true,
        placeholderData: keepPreviousData,
    });

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox
                    searchQuery={currentQuery}
                    setSearchQuery={setCurrentQuery}
                />
                <button className={css.button} onClick={() => setOpenNoteForm(true)}>
                    Create note +
                </button>
            </header>
            {data && data.notes && data.notes.length > 0 && (
                <>
                    {data.totalPages > 1 && !isLoading && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={data.totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                    <NoteList notes={data.notes} onDelete={handleDeleteNote} />
                </>
            )}
            {openNoteForm && (
                <Modal onClose={onNoteFormClose}>
                    <NoteForm onSubmit={onSubmitNewNoteForm} onClose={onNoteFormClose} />
                </Modal>
            )}
        </div>
    );
}

export default NotesClient;
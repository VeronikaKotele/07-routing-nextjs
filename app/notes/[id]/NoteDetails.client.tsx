"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css"

const NoteDetailsClient = () => {
    const { id } = useParams<{ id: string }>();

    const { data: note, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>

    if (error || !note) return <p>Something went wrong.</p>;

    const formattedDate = note.updatedAt
        ? `Updated at: ${note.updatedAt}`
        : `Created at: ${note.createdAt}`;

    const router = useRouter();
    const handleGoBack = () => {
        const isSure = confirm('Are you sure?');
        if (isSure) {
            router.back();
        }
    };

    return (
        <div className={css.container}>
            <div className={css.item}>
                <button onClick={handleGoBack}>Back</button>
                <div className={css.header}>
                    <h2>{note.title}</h2>
                </div>
                <p className={css.tag}>{note.tag}</p>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>{formattedDate}</p>
            </div>
        </div>
    );
};

export default NoteDetailsClient;
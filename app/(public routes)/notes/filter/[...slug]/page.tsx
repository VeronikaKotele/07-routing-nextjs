import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";

type Props = {
    params: Promise<{ slug: string[] }>;
};

const Notes = async ({ params }: Props) => {
    const { slug } = await params;
    const tag = slug[0] === 'all' ? undefined : slug[0] as NoteTag;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes", tag],
        queryFn: () => fetchNotes({ tag: tag }),
    });

    return (
        <section>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NotesClient tag={tag} />
            </HydrationBoundary>
        </section>
    );
}

export default Notes;

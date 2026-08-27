import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

const Notes = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes"],
        queryFn: () => fetchNotes({}),
    });

    return (
        <section>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NotesClient />
            </HydrationBoundary>
        </section>
    );
}

export default Notes;

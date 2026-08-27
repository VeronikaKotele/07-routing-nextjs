import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

type Props = {
    params: Promise<{ slug: string[] }>;
};

const Notes = async ({ params }: Props) => {
    const { slug } = await params;
    const category = slug[0] === 'all' ? undefined : slug[0];

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes"],
        queryFn: () => fetchNotes({ category }),
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

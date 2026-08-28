import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";
import Modal from "@/components/Modal/Modal";

type Props = {
    params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
    const { id } = await params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <Modal>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NotePreviewClient />
            </HydrationBoundary>
        </Modal>
    );
}

export default NotePreview;
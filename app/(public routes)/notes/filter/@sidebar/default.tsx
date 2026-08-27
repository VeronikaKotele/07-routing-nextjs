import Link from 'next/link';
import { NOTE_TAGS } from '@/types/note';
import css from './SidebarNotes.module.css';

const NotesSidebar = async () => {
    const tags = NOTE_TAGS;

    return (
        <ul className={css.menuList}>
            <li className={css.menuItem}>
                <Link href={`/notes/filter/all`} className={css.menuLink}>All notes</Link>
            </li>
            {tags.map((tag) => (
                <li key={tag} className={css.menuItem}>
                    <Link href={`/notes/filter/${tag}`} className={css.menuLink}>{tag}</Link>
                </li>
            ))}
        </ul>
    );
};

export default NotesSidebar;
import css from "./SearchBox.module.css";
import { useDebouncedCallback } from "use-debounce";

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBox({
  searchQuery,
  setSearchQuery,
}: SearchBoxProps) {
  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setSearchQuery(event.target.value),
    1000
  );

  return (
    <input
      className={css.input}
      type="text"
      defaultValue={searchQuery}
      onChange={handleChange}
      placeholder="Search notes"
    />
  );
}

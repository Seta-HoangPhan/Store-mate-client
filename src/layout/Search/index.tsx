import SearchBar from "@components/SearchBar";
import { useState } from "react";

export default function LayoutSearch() {
  const [search, setSearch] = useState<string>("");

  return (
    <SearchBar
      className="layout-container__appbar__search-bar"
      onSearch={() => {}}
      search={search}
      setSearch={setSearch}
    />
  );
}

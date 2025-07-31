import SearchIcon from "@mui/icons-material/Search";
import { Box, InputBase } from "@mui/material";
import cn from "classnames";
import { debounce } from "lodash";
import { useEffect, useMemo } from "react";
import "./index.scss";

interface Props {
  className: string;
  onSearch: (search: string) => void;
  search: string;
  setSearch: (val: string) => void;
}

export default function SearchBar({
  className,
  onSearch,
  search,
  setSearch,
}: Props) {
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch, onSearch]);

  return (
    <Box className={cn(className, "search-bar-wrapper")}>
      <div className="search-bar__icon">
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Tìm kiếm…"
        inputProps={{ "aria-label": "search" }}
        className="search-bar__input-base"
        value={search}
        onChange={(e) => setSearch(e.target.value.trim())}
        onKeyDown={(e) => e.stopPropagation()}
      />
    </Box>
  );
}

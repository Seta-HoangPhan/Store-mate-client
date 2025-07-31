import SearchBar from "@components/SearchBar";
import {
  Checkbox,
  ListItemText,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import "./index.scss";
import { useState } from "react";

export interface Option {
  id: string;
  label: string;
}

interface Props {
  options: Option[];
  selectedOptions: Option[];
  onSelect: (optionId: string) => void;
  onUnselect: (optionId: string) => void;
  onSearch: (search: string) => void;
}

export default function MultiSelect({
  options,
  selectedOptions,
  onSelect,
  onUnselect,
  onSearch,
}: Props) {
  const selectedOptionIds = selectedOptions.map((option) => option.id);
  const selectedOptionIdSet = new Set(selectedOptionIds);

  const [searchText, setSearchText] = useState<string>("");

  const resetSearchText = () => setSearchText("");

  const renderValue = (selectedValues: string[]) => {
    const length = selectedValues.length;
    if (length === 0 || length === options.length) {
      return <span>Lọc toàn bộ</span>;
    }

    return <span>{selectedValues.length} selected</span>;
  };

  const handleToggleSelect = (id: string) => {
    if (selectedOptionIdSet.has(id)) {
      onUnselect(id);
    } else {
      onSelect(id);
    }

    resetSearchText();
  };

  return (
    <Select
      multiple
      value={selectedOptionIds}
      input={<OutlinedInput />}
      renderValue={renderValue}
      displayEmpty
      onKeyDown={resetSearchText}
      onClose={() => setSearchText("")}
      MenuProps={{
        slotProps: {
          list: { disableListWrap: true },
        },
        PaperProps: {
          className: "multi-select__paper",
        },
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      }}
      className="multi-select"
    >
      <ListSubheader className="multi-select__list-sub-header">
        <SearchBar
          className="multi-select__search-bar"
          onSearch={onSearch}
          search={searchText}
          setSearch={setSearchText}
        />
      </ListSubheader>
      {options.map(({ id, label }) => (
        <MenuItem
          key={id}
          value={id}
          className="multi-select__list-item"
          onClick={() => handleToggleSelect(id)}
          autoFocus={false}
        >
          <Checkbox checked={selectedOptionIdSet.has(id)} />
          <ListItemText
            primary={label}
            className="multi-select__list-item__text"
          />
        </MenuItem>
      ))}
    </Select>
  );
}

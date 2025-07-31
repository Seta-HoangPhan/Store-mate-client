import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import "./index.scss";

interface Props {
  onClick: () => void;
}

export default function AddButton({ onClick }: Props) {
  return (
    <IconButton className="add-icon-btn" onClick={onClick}>
      <AddIcon color="primary" />
    </IconButton>
  );
}

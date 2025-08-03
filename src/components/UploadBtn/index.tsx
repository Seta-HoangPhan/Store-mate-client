import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import type { ChangeEvent } from "react";
import "./index.scss";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadBtn({ onChange }: Props) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      className="upload-btn"
    >
      Upload image
      <input type="file" onChange={onChange} />
    </Button>
  );
}

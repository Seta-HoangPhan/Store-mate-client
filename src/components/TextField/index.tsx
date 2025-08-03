import { TextField as MuiTextField, type TextFieldProps } from "@mui/material";
import "./index.scss";

export default function TextField(props: TextFieldProps) {
  return (
    <MuiTextField
      {...props}
      className="text-field"
      slotProps={{ input: { className: "text-field-input" } }}
    />
  );
}

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { TextField as MuiTextField, type TextFieldProps } from "@mui/material";
import "./index.scss";

export default function TextArea(props: TextFieldProps) {
  return (
    <MuiTextField
      {...props}
      className="text-area"
      multiline
      rows={props.rows ?? 4}
      fullWidth={props.fullWidth ?? true}
      slotProps={{
        input: {
          endAdornment: <ArrowDropUpIcon />,
          className: "text-area-input",
        },
      }}
    />
  );
}

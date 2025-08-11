import {
  InputAdornment,
  TextField as MuiTextField,
  type TextFieldProps,
} from "@mui/material";
import "./index.scss";

type Props = TextFieldProps & {
  currency?: boolean;
  phone?: boolean;
  height?: string;
};

export default function TextField({
  currency,
  phone,
  height,
  ...props
}: Props) {
  return (
    <MuiTextField
      {...props}
      className="text-field"
      slotProps={{
        input: {
          className: "text-field-input",
          sx: { height, lineHeight: "unset" },
          startAdornment: phone && (
            <InputAdornment position="start">+84</InputAdornment>
          ),
          endAdornment: currency && (
            <InputAdornment position="end">đ</InputAdornment>
          ),
        },
      }}
    />
  );
}

import {
  InputAdornment,
  TextField as MuiTextField,
  type TextFieldProps,
} from "@mui/material";
import "./index.scss";

type Props = TextFieldProps & {
  currency?: boolean;
};

export default function TextField({ currency, ...props }: Props) {
  return (
    <MuiTextField
      {...props}
      className="text-field"
      slotProps={{
        input: {
          className: "text-field-input",
          endAdornment: currency && (
            <InputAdornment position="end">đ</InputAdornment>
          ),
        },
      }}
    />
  );
}

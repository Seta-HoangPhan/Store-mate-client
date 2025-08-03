import { Select as MuiSelect, type SelectProps } from "@mui/material";
import "./index.scss";
import type { ReactNode } from "react";

type Props = SelectProps & {
  children: ReactNode;
};

export default function Select({ children, ...props }: Props) {
  return (
    <MuiSelect
      {...props}
      className="select"
      MenuProps={{
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        slotProps: {
          paper: {
            className: "select-paper",
          },
        },
      }}
    >
      {children}
    </MuiSelect>
  );
}

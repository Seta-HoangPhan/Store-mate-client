import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { ReactNode } from "react";
import "./index.scss";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmBtn: {
    text: string;
    color?:
      | "inherit"
      | "primary"
      | "secondary"
      | "success"
      | "error"
      | "info"
      | "warning";
    loading?: boolean;
  };
  children: ReactNode;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  confirmBtn,
  children,
}: Props) {
  return (
    <Dialog
      open={open}
      className="confirm-dialog"
      slotProps={{ paper: { className: "confirm-dialog__paper" } }}
    >
      <DialogTitle className="confirm-dialog__title">{title}</DialogTitle>
      <DialogContent className="confirm-dialog__content">
        {children}
      </DialogContent>
      <DialogActions className="confirm-dialog__actions">
        <Button onClick={onClose} variant="text">
          Thoát
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          autoFocus
          color={confirmBtn.color || "primary"}
        >
          {confirmBtn.loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            confirmBtn.text
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

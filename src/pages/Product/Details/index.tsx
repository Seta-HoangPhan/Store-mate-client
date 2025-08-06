import CloseIcon from "@mui/icons-material/Close";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { selectProductDetail } from "@redux/features/product/selector";
import { useSelector } from "react-redux";
import "./index.scss";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ProductDetails({ open, onClose }: Props) {
  const { status: statusDetail } = useSelector(selectProductDetail);

  const isLoading = statusDetail === "loading";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="product-detail"
      slotProps={{ paper: { className: "product-detail__paper" } }}
    >
      <DialogTitle className="product-detail__title">
        <h3>Thông tin chi tiết</h3>
        <IconButton onClick={onClose} disabled={isLoading}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="product-detail__content">
        {isLoading ? (
          <div className="product-detail__content__loading">
            <CircularProgress />
          </div>
        ) : (
          <div className="product-detail__content__wrapper">
            <h1>alo anh Hoang</h1>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

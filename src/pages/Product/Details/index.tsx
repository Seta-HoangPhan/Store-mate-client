import { productImage } from "@assets/images";
import type { Column } from "@components/Table";
import Table from "@components/Table";
import CloseIcon from "@mui/icons-material/Close";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import {
  selectFlatPurchaseProducts,
  selectProductDetail,
  type FlatPurchaseProduct,
} from "@redux/features/product/selector";
import { formatVnd } from "@utils/formatVnd";
import { useSelector } from "react-redux";
import "./index.scss";
import dayjs from "dayjs";

const columns: Column<FlatPurchaseProduct>[] = [
  {
    id: "supplier",
    header: "Nhà cung cấp",
    render: (value) => <div>{value || ""}</div>,
    width: "15%",
  },
  {
    id: "importDate",
    header: "Ngày nhập",
    render: (value) => (
      <div>
        {value && typeof value === "string"
          ? dayjs(value).format("DD-MM-YYYY")
          : ""}
      </div>
    ),
    width: "15%",
    align: "center",
  },
  {
    id: "unitPrice",
    header: "Giá niêm yết (VND)",
    render: (value) => (
      <div>{(typeof value === "number" && formatVnd(value)) || ""}</div>
    ),
    width: "15%",
    align: "center",
  },
  {
    id: "discount",
    header: "Giảm giá (%)",
    render: (value) => <div>{value ?? ""}</div>,
    width: "15%",
    align: "center",
  },
  {
    id: "netPrice",
    header: "Giảm nhập (VND)",
    render: (value) => (
      <div>{(typeof value === "number" && formatVnd(value)) || ""}</div>
    ),
    width: "15%",
    align: "center",
  },
  {
    id: "quantity",
    header: "Số lượng nhập",
    render: (value) => <div>{value || "0"}</div>,
    width: "15%",
    align: "center",
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ProductDetails({ open, onClose }: Props) {
  const { data: productDetail, status: statusDetail } =
    useSelector(selectProductDetail);
  const flatPurchaseProducts = useSelector(selectFlatPurchaseProducts);

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
            <Grid container spacing={2}>
              <Grid size={6} display="flex" justifyContent="center">
                <div className="product-detail__content__thumbnail">
                  <img src={productDetail?.thumbnail || productImage} alt="" />
                </div>
              </Grid>
              <Grid size={6}>
                <div className="product-detail__content__general">
                  <Typography
                    className="product-detail__content__general-name"
                    color="primary"
                  >
                    {productDetail?.name || ""}
                  </Typography>
                  <div className="product-detail__content__general-description">
                    {productDetail?.description || ""}
                  </div>
                  <div className="product-detail__content__general-info">
                    <span>Giá bán:</span>
                    <span>
                      {productDetail?.sellingPrice
                        ? `${formatVnd(productDetail.sellingPrice)}đ`
                        : ""}
                    </span>
                  </div>
                  <div className="product-detail__content__general-info">
                    <span>Số lượng còn lại:</span>
                    <span>{productDetail?.quantity || ""}</span>
                  </div>
                </div>
              </Grid>
              <Grid size={12}>
                {flatPurchaseProducts.length > 0 && (
                  <Table<FlatPurchaseProduct>
                    data={flatPurchaseProducts}
                    columns={columns}
                  />
                )}
              </Grid>
            </Grid>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

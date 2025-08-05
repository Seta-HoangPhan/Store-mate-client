import { emptyImage, productImage } from "@assets/images";
import AddButton from "@components/AddButton";
import MultiSelect from "@components/MultiSelect";
import Table, { type Column } from "@components/Table";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import {
  Collapse,
  FormControl,
  FormLabel,
  IconButton,
  styled,
  Typography,
  type SvgIconProps,
} from "@mui/material";
import { fetchCategories } from "@redux/features/category/action";
import { selectCategories } from "@redux/features/category/selector";
import {
  fetchProducts,
  removeFilterCategoryIds,
  setFilterCategoryIds,
  setFilterCategorySearch,
  toggleOpenCreateProductDrawer,
} from "@redux/features/product/action";
import {
  selectCategoryBySearch,
  selectFilterCategoryIds,
  selectSortedProductMapper,
} from "@redux/features/product/selector";
import type { Product } from "@typings/redux";
import { convertToOptions } from "@utils/convertToOptions";
import { formatVnd } from "@utils/formatVnd";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
export type ProductView = "list" | "grid";

const columns: Column<Product>[] = [
  {
    id: "name",
    header: "Loại sản phẩm",
    render: (value) =>
      typeof value === "string" && (
        <div className="product-table-cell__name">
          <span>{value}</span>
        </div>
      ),
    width: "15%",
  },
  {
    id: "thumbnail",
    header: "Hình ảnh",
    render: (value) =>
      (typeof value === "string" || value === null) && (
        <div className="product-table-cell__image">
          <img src={value || productImage} alt="thumbnail" />
        </div>
      ),
    width: "20%",
    align: "center",
  },
  {
    id: "unitPrice",
    header: "Giá nhập (VND)",
    render: (value) =>
      typeof value === "number" && <span>{formatVnd(value)}</span>,
    width: "20%",
    align: "center",
  },
  {
    id: "sellingPrice",
    header: "Giá bán (VND)",
    render: (value) =>
      typeof value === "number" && <span>{formatVnd(value)}</span>,
    width: "20%",
    align: "center",
  },
  {
    id: "quantity",
    header: "Số lượng",
    render: (value) => typeof value === "number" && <span>{value}</span>,
    width: "10%",
    align: "center",
  },
];

const ArrowIcon = styled(KeyboardArrowDownIcon)<
  SvgIconProps & { open: boolean }
>(({ theme, open }) => ({
  transform: open ? "rotate(180deg)" : "rotate(0deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Product() {
  const dispatch = useDispatch();

  const categoryBySearch = useSelector(selectCategoryBySearch);
  const filterCategoryIds = useSelector(selectFilterCategoryIds);
  const productMapper = useSelector(selectSortedProductMapper);
  const { data: categories } = useSelector(selectCategories);

  const [productView, setProductView] = useState<ProductView>("list");
  const [tableOpenMapper, setTableOpenMapper] = useState<
    Record<string, boolean>
  >({});

  const selectedCategoryIds = useMemo(() => {
    return filterCategoryIds.map((id) => id.toString());
  }, [filterCategoryIds]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts(filterCategoryIds));
    for (const id of Object.keys(tableOpenMapper)) {
      if (!filterCategoryIds.includes(Number(id))) {
        setTableOpenMapper((prev) => ({
          ...prev,
          [id]: true,
        }));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filterCategoryIds]);

  useEffect(() => {
    for (const cat of categories) {
      setTableOpenMapper((prev) => ({
        ...prev,
        [cat.id.toString()]: true,
      }));
    }
  }, [categories]);

  const handleSelectCategory = (catId: string) => {
    dispatch(setFilterCategoryIds(Number(catId)));
  };

  const handleUnselectCategory = (catId: string) => {
    dispatch(removeFilterCategoryIds(Number(catId)));
  };

  const handleSearchCategory = (search: string) => {
    dispatch(setFilterCategorySearch(search));
  };

  const handleToggleProductView = () => {
    setProductView((prev) => (prev === "list" ? "grid" : "list"));
  };

  const handleOpenCreateProductDrawer = () => {
    dispatch(toggleOpenCreateProductDrawer());
  };

  const renderCategoryName = (id: string, length: number) => {
    const category = categories.find((cat) => cat.id === Number(id));
    if (!category) return null;

    const handleClick = () => {
      setTableOpenMapper((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };

    return (
      <div className="product-main-content__table-name" onClick={handleClick}>
        <Typography component="span" color="secondary">
          {category?.name} - {`(${length})`}
          <ArrowIcon open={tableOpenMapper[id]} />
        </Typography>
      </div>
    );
  };

  const hasAction = {
    onDelete: () => {},
    onEdit: () => {},
  };

  return (
    <div className="product-wrapper">
      <div className="product-header">
        <AddButton onClick={handleOpenCreateProductDrawer} />
        <div className="product-header__right">
          <FormControl className="product-header__category-filter">
            <FormLabel>Loại sản phẩm:</FormLabel>
            <MultiSelect
              options={convertToOptions(categoryBySearch)}
              selectedOptions={selectedCategoryIds}
              onSelect={handleSelectCategory}
              onUnselect={handleUnselectCategory}
              onSearch={handleSearchCategory}
            />
          </FormControl>
          <div className="product-header__icon-view">
            <IconButton
              className="icon-button"
              onClick={handleToggleProductView}
            >
              {productView === "list" ? (
                <ListOutlinedIcon />
              ) : (
                <GridViewOutlinedIcon />
              )}
            </IconButton>
          </div>
        </div>
      </div>
      <div className="product-main-content">
        {Object.entries(productMapper).map(([key, value]) => (
          <div className="product-main-content__table">
            {renderCategoryName(key, value.length)}
            {value.length ? (
              <Table<Product>
                key={`table-${key}`}
                data={value}
                columns={columns}
                hasAction={hasAction}
                open={tableOpenMapper[key]}
              />
            ) : (
              <Collapse in={tableOpenMapper[key]} timeout="auto" unmountOnExit>
                <div className="product-main-content__empty-table">
                  <img src={emptyImage} alt="empty" />
                </div>
              </Collapse>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

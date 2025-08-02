import {
  CategoryIcon,
  CustomerIcon,
  DashboardIcon,
  OrderIcon,
  ProductIcon,
  PurchaseIcon,
  SupplierIcon,
} from "@assets/svgs";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import cn from "classnames";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import LayoutDrawer from "./Drawer";
import "./index.scss";
import LayoutSearch from "./Search";
import { useDispatch } from "react-redux";
import * as actions from "@redux/features/auth/action";

const pathnames = {
  category: "Loại sản phẩm",
  product: "Sản phẩm",
  order: "Hóa đơn",
  customer: "Khách hàng",
  purchase: "Nhập hàng",
  supplier: "Nhà cung cấp",
  dashboard: "Biểu đồ",
} as const;

const sidebarItems = [
  {
    icon: <CategoryIcon />,
    label: pathnames.category,
    path: "category",
  },
  {
    icon: <ProductIcon />,
    label: pathnames.product,
    path: "product",
  },
  {
    icon: <OrderIcon />,
    label: pathnames.order,
    path: "order",
  },
  {
    icon: <CustomerIcon />,
    label: pathnames.customer,
    path: "customer",
  },
  {
    icon: <PurchaseIcon />,
    label: pathnames.purchase,
    path: "purchase",
  },
  {
    icon: <SupplierIcon />,
    label: pathnames.supplier,
    path: "supplier",
  },
  {
    icon: <DashboardIcon />,
    label: pathnames.dashboard,
    path: "dashboard",
  },
];

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localtion = useLocation();
  const pathname = localtion.pathname;

  const [currPage, setCurrPage] = useState("");

  useEffect(() => {
    const currentPage = pathname.split("/")[1];
    const validPathnames = Object.keys(pathnames);
    setCurrPage(validPathnames.includes(currentPage) ? currentPage : "");
  }, [pathname]);

  const handleLogout = () => {
    dispatch(actions.logout());
  };

  return (
    <div className="layout-wrapper">
      <div className="layout-sidebar">
        <div className="layout-sidebar__logo">
          <h1>Store Mate</h1>
        </div>
        <Divider className="layout-sidebar__divider" />
        <List>
          {sidebarItems.map(({ icon, label, path }) => (
            <ListItem disablePadding key={label}>
              <ListItemButton
                className={cn("layout-sidebar__list-item-button", {
                  active: currPage === path,
                })}
                onClick={() => navigate(`/${path}`)}
              >
                <ListItemIcon className="layout-sidebar__list-item-button__icon">
                  {icon}
                </ListItemIcon>
                <ListItemText
                  className="layout-sidebar__list-item-button__label"
                  primary={label}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
      <div className="layout-container">
        <div className="layout-container__appbar">
          <div />
          <LayoutSearch />
          <Button variant="contained" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </div>
        <div className="layout-container__maincontent">
          <Outlet />
        </div>
      </div>
      <LayoutDrawer />
    </div>
  );
}

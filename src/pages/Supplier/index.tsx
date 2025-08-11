import AddButton from "@components/AddButton";
import Table, { type Column } from "@components/Table";
import {
  fetchSuppliers,
  toggleOpenCreateSupplierDrawer,
  toggleOpenEditSupplierDrawer,
} from "@redux/features/supplier/action";
import { selectSuppliers } from "@redux/features/supplier/selector";
import type { Supplier } from "@typings/redux";
import { formatPhoneNumber } from "@utils/formatPhone";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";

const isString = (val: unknown): val is string => typeof val === "string";

const columns: Column<Supplier>[] = [
  {
    id: "name",
    header: "Tên gọi",
    width: "25%",
    render: (value) => <div>{isString(value) && value}</div>,
  },
  {
    id: "phones",
    header: "Số điện thoại",
    width: "20%",
    render: (value) => (
      <div>
        {Array.isArray(value) &&
          value.map((val) => <div>{formatPhoneNumber(val.phone)}</div>)}
      </div>
    ),
  },
  {
    id: "email",
    header: "Email",
    width: "20%",
    render: (value) => (
      <div>{isString(value) && value ? value : "Chưa lưu"}</div>
    ),
  },
  {
    id: "address",
    header: "Địa chỉ",
    width: "25%",
    render: (value) => <div>{isString(value) && value}</div>,
  },
];

export default function SupplierPage() {
  const dispatch = useDispatch();

  const { data: suppliers } = useSelector(selectSuppliers);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleClickAddSupplier = () => {
    dispatch(toggleOpenCreateSupplierDrawer());
  };

  const handleEdit = (id: number) => {
    dispatch(toggleOpenEditSupplierDrawer(id));
  };

  const hasAction = {
    onEdit: handleEdit,
  };

  return (
    <div className="supplier-wrapper">
      <div className="supplier-header">
        <AddButton onClick={handleClickAddSupplier} />
      </div>
      <Table<Supplier>
        data={suppliers}
        columns={columns}
        hasAction={hasAction}
      />
    </div>
  );
}

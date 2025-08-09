import AddButton from "@components/AddButton";
import Table, { type Column } from "@components/Table";
import type { Supplier } from "@typings/redux";
import "./index.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSuppliers } from "@redux/features/supplier/action";
import { useSelector } from "react-redux";
import { selectSuppliers } from "@redux/features/supplier/selector";
import { AsYouType } from "libphonenumber-js";

const isString = (val: unknown): val is string => typeof val === "string";

const formatPhone = (phone: string) => {
  const prefix = phone.slice(0, 3);
  const phoneUniq = phone.slice(3);

  const formater = new AsYouType("VN");
  const formated = formater.input(phoneUniq);

  return `${prefix} ${formated}`;
};

const columns: Column<Supplier>[] = [
  {
    id: "name",
    header: "Tên gọi",
    width: "20%",
    render: (value) => <div>{isString(value) && value}</div>,
  },
  {
    id: "phones",
    header: "Số điện thoại",
    width: "20%",
    render: (value) => (
      <div>
        {Array.isArray(value) &&
          value.map((val) => <div>{formatPhone(val.phone)}</div>)}
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
    width: "30%",
    render: (value) => <div>{isString(value) && value}</div>,
  },
];

export default function SupplierPage() {
  const dispatch = useDispatch();

  const { data: suppliers } = useSelector(selectSuppliers);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleClickAddSupplier = () => {};

  return (
    <div className="supplier-wrapper">
      <div className="supplier-header">
        <AddButton onClick={handleClickAddSupplier} />
      </div>
      <Table<Supplier> data={suppliers} columns={columns} />
    </div>
  );
}

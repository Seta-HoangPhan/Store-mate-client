import { createReducer } from "@reduxjs/toolkit";
import type { APIStatus, Product } from "@typings/redux";
import * as actions from "./action";

interface InitialState {
  products: {
    status: APIStatus;
    data: Product[];
    error?: string;
  };
  isOpenCreateProductDrawer: boolean;
  isOpenEditProductDrawer: boolean;
}

const initialState: InitialState = {
  products: {
    status: "idle",
    data: [
      {
        id: 1,
        name: "Máy bơm nước Panasonic GP-200JXK",
        description:
          "Máy bơm nước gia đình, công suất 200W, phù hợp sử dụng cho nhà 2-3 tầng.",
        thumbnail: "https://example.com/images/pump.jpg",
        unitPrice: 1450000,
        sellingPrice: 1290000,
        quantity: 10,
        category: {
          id: 1,
          name: "Thiết bị điện nước",
        },
      },
      {
        id: 2,
        name: "Ống nhựa PVC Bình Minh 27mm",
        description:
          "Ống dẫn nước bằng nhựa PVC, đường kính 27mm, chịu áp lực cao.",
        thumbnail: "https://example.com/images/pvc-pipe.jpg",
        unitPrice: 27000,
        sellingPrice: 25000,
        quantity: 100,
        category: {
          id: 1,
          name: "Thiết bị điện nước",
        },
      },
      {
        id: 3,
        name: "Vòi sen nóng lạnh INAX BFV-213S",
        description:
          "Bộ vòi sen cao cấp, thiết kế hiện đại, chất liệu inox chống gỉ.",
        thumbnail: "https://example.com/images/shower.jpg",
        unitPrice: 950000,
        sellingPrice: 875000,
        quantity: 15,
        category: {
          id: 1,
          name: "Thiết bị điện nước",
        },
      },
      {
        id: 4,
        name: "Van khóa nước tay gạt 21mm",
        description:
          "Van khóa tay gạt bằng đồng, dùng trong hệ thống cấp thoát nước.",
        thumbnail: "https://example.com/images/valve.jpg",
        unitPrice: 35000,
        sellingPrice: 33000,
        quantity: 50,
        category: {
          id: 1,
          name: "Thiết bị điện nước",
        },
      },
      {
        id: 5,
        name: "Bồn cầu 2 khối Cotto C1234",
        description:
          "Bồn cầu 2 khối, xả mạnh, tiết kiệm nước, dễ lắp đặt và vệ sinh.",
        thumbnail: "https://example.com/images/toilet.jpg",
        unitPrice: 2800000,
        sellingPrice: 2650000,
        quantity: 7,
        category: {
          id: 1,
          name: "Thiết bị điện nước",
        },
      },
    ],
  },
  isOpenCreateProductDrawer: false,
  isOpenEditProductDrawer: false,
};

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.fetchProducts, (state) => {
      state.products.status = "loading";
    })
    .addCase(actions.fetchProductsSuccess, (state, action) => {
      state.products.status = "completed";
      state.products.data = action.payload;
    })
    .addCase(actions.fetchProductsFailed, (state, action) => {
      state.products.status = "rejected";
      state.products.error = action.payload;
    })

    .addCase(actions.toggleOpenCreateProductDrawer, (state) => {
      state.isOpenCreateProductDrawer = !state.isOpenCreateProductDrawer;
    });
});

export default productReducer;

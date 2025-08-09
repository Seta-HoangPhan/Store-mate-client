import { createReducer } from "@reduxjs/toolkit";
import type { APIStatus, Supplier } from "@typings/redux";
import * as actions from "./action";

interface InitialState {
  suppliers: {
    status: APIStatus;
    data: Supplier[];
    error?: string;
  };
  isOpenCreateSupplierDrawer: boolean;
  isOpenEditSupplierDrawer: boolean;
  supplierDetail: {
    status: APIStatus;
    data?: Supplier;
    error?: string;
  };
  supplierCreate: {
    status: APIStatus;
    data?: Supplier;
    error?: string;
  };
  supplierEdit: {
    status: APIStatus;
    data?: Supplier;
    error?: string;
  };
  supplierDelete: {
    status: APIStatus;
    data?: { id: number };
    error?: string;
  };
}

const initialState: InitialState = {
  suppliers: {
    status: "idle",
    data: [],
  },
  isOpenCreateSupplierDrawer: false,
  isOpenEditSupplierDrawer: false,
  supplierDetail: {
    status: "idle",
  },
  supplierCreate: {
    status: "idle",
  },
  supplierEdit: {
    status: "idle",
  },
  supplierDelete: {
    status: "idle",
  },
};

const supplierReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.fetchSuppliers, (state) => {
      state.suppliers.status = "loading";
    })
    .addCase(actions.fetchSuppliersSuccess, (state, action) => {
      state.suppliers.status = "completed";
      state.suppliers.data = action.payload;
    })
    .addCase(actions.fetchSuppliersFailed, (state, action) => {
      state.suppliers.status = "rejected";
      state.suppliers.error = action.payload;
    })
    .addCase(actions.toggleOpenCreateSupplierDrawer, (state) => {
      state.isOpenCreateSupplierDrawer = !state.isOpenCreateSupplierDrawer;
      if (state.isOpenCreateSupplierDrawer) {
        state.supplierCreate = {
          status: "idle",
        };
      }
    })

    // fetch one
    .addCase(
      actions.toggleOpenEditSupplierDrawer,
      (state, { payload: catId }) => {
        state.isOpenEditSupplierDrawer = !state.isOpenEditSupplierDrawer;
        if (catId) {
          state.supplierDetail.status = "loading";
          state.supplierEdit = {
            status: "idle",
          };
        }
      }
    )
    .addCase(actions.fetchSupplierSuccess, (state, { payload: category }) => {
      state.supplierDetail.status = "completed";
      state.supplierDetail.data = category;
    })
    .addCase(actions.fetchSupplierFailed, (state, { payload: error }) => {
      state.supplierDetail.status = "rejected";
      state.supplierDetail.error = error;
    })

    // create
    .addCase(actions.createSupplier, (state) => {
      state.supplierCreate.status = "loading";
    })
    .addCase(actions.createSupplierSuccess, (state, { payload: category }) => {
      state.supplierCreate.status = "completed";
      state.supplierCreate.data = category;
      state.suppliers.data = [
        state.supplierCreate.data,
        ...state.suppliers.data,
      ];
    })
    .addCase(actions.createSupplierFailed, (state, { payload: error }) => {
      state.supplierCreate.status = "rejected";
      state.supplierDetail.error = error;
    })

    // edit
    .addCase(actions.editSupplier, (state) => {
      state.supplierEdit.status = "loading";
    })
    .addCase(actions.editSupplierSuccess, (state, { payload: category }) => {
      state.supplierEdit.status = "completed";
      state.supplierEdit.data = category;
      state.suppliers.data = state.suppliers.data.map((cat) => {
        if (cat.id !== category.id) return cat;
        return category;
      });
    })
    .addCase(actions.editSupplierFailed, (state, { payload: error }) => {
      state.supplierEdit.status = "rejected";
      state.supplierEdit.error = error;
    })

    // delete
    .addCase(actions.deleteSupplier, (state) => {
      state.supplierDelete.status = "loading";
    })
    .addCase(actions.deleteSupplierSuccess, (state, { payload: category }) => {
      state.supplierDelete.status = "completed";
      state.supplierDelete.data = category;
      state.suppliers.data = state.suppliers.data.filter(
        (cat) => cat.id !== category.id
      );
    })
    .addCase(actions.deleteSupplierFailed, (state, { payload: error }) => {
      state.supplierDelete.status = "rejected";
      state.supplierDelete.error = error;
    });
});

export default supplierReducer;

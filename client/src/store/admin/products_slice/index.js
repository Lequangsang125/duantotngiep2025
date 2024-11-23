import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  error: null, // Thêm trường error để lưu thông tin lỗi
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
//   Nó được sử dụng để trả về một giá trị cụ thể khi một hành động bất đồng bộ (async action) bị từ chối hoặc gặp lỗi. Giá trị này sẽ được gắn vào action.payload trong các trường hợp rejected của extraReducers.
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/api/admin/products/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred"); // Sử dụng rejectWithValue để trả về thông tin lỗi
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/admin/products/get"
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const result = await axios.put(
        `http://localhost:5000/api/admin/products/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.delete(
        `http://localhost:5000/api/admin/products/delete/${id}`
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        state.error = null;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.payload;
      })

      // Add new product
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.productList.push(action.payload.data); // Cập nhật danh sách sản phẩm
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Edit product
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const updatedProduct = action.payload.data;
        const index = state.productList.findIndex(
          (product) => product._id === updatedProduct._id
        );
        if (index !== -1) {
          state.productList[index] = updatedProduct;
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const deletedProductId = action.payload.data._id;
        state.productList = state.productList.filter(
          (product) => product._id !== deletedProductId
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default AdminProductsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuth: false,
  isLoading: true,
  user: null,
  error: null,
};

// Action creator cho việc đăng ký người dùng
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Sử dụng rejectWithValue để trả về thông tin lỗi
      }
      throw error;
    }
  }
);

// Action creator cho việc đăng nhập người dùng
export const signinUser = createAsyncThunk(
  "auth/signin",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signin",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Sử dụng rejectWithValue để trả về thông tin lỗi
      }
      throw error;
    }
  }
);
// Thêm action creator cho checkAuth
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/check-auth", {
        withCredentials: true,
        headers:{
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        }
      });
      return res.data.user; // Trả về thông tin người dùng
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Trả về lỗi nếu có
      }
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý signupUser
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuth = false;
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
        console.log(state.error);
      })
      // Xử lý signinUser
      .addCase(signinUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        console.log(state.user);
        state.isAuth = true;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuth = false;
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
        console.log(state.error);
      })
        // Xử lý checkAuth
        .addCase(checkAuth.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
          state.isAuth = true;
        })
        .addCase(checkAuth.rejected, (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.isAuth = false;
          state.error = action.payload ? action.payload.message : action.error.message;
          console.log(state.error);
        });
      
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

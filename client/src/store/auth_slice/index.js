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
    console.log("checkAuth action dispatched"); // Log để kiểm tra
    try {
      const res = await axios.get("http://localhost:5000/api/auth/check-auth", {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      });
      console.log("API response:", res.data); // Log dữ liệu trả về từ API
      return res.data.user;
    } catch (error) {
      console.log("API error:", error.response?.data || error.message); // Log lỗi API
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
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
        console.log(action.payload)
        if (action.payload && action.payload.success) { 
          state.isLoading = false;
          state.user = action.payload;
          state.isAuth = true;
        } else {
          state.isLoading = false;
          state.user = null;
          state.isAuth = false;
        }
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
          console.log("pending")
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

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

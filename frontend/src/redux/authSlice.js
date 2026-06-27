import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import API from "../api/axios";

export const checkUser = createAsyncThunk("auth/checkUser", async () => {
  const res = await API.get("/auth/getme", {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }); //getme
  console.log("checkUser response:", res.data);
  return res.data.user;
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/auth/login", data);
      console.log("loginUser response:", res.data);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/auth/register", data);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await API.post("/auth/logout");
});

export const updateInterests = createAsyncThunk(
  "auth/updateInterests",
  async (interests, thunkAPI) => {
    console.log("reach to updateinterest thunk");
    try {
      const res = await API.put("/users/interests", { interests });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(checkUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(checkUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected,(state,action)=>{
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateInterests.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload.user;
      });
  },
});

export default authSlice.reducer;

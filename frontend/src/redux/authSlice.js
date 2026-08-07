import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const checkUser = createAsyncThunk("auth/checkUser", async (_, thunkAPI) => {
  try {
    const res = await API.get("/auth/getme");
    return res.data.user;
  } catch {
    return thunkAPI.rejectWithValue(null);
  }
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/auth/login", data);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Invalid credentials"
      );
    }
  }
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
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await API.post("/auth/logout");
});

export const updateInterests = createAsyncThunk(
  "auth/updateInterests",
  async (interests, thunkAPI) => {
    try {
      const res = await API.put("/users/interests", { interests });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update interests"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ name }, thunkAPI) => {
    try {
      const res = await API.put("/users/profile", { name });
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ currentPassword, newPassword }, thunkAPI) => {
    try {
      const res = await API.put("/users/password", { currentPassword, newPassword });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to change password"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    // Start as true — AppRoutes dispatches checkUser immediately on mount.
    // We keep loading=true until checkUser resolves (success OR failure) so
    // ProtectedRoute never flashes a redirect before we know the session status.
    loading: true,
    error: null,
  },
  reducers: {
    // Allows other parts of the app to manually clear auth state
    clearAuth(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ── checkUser ──────────────────────────────────────────────
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

      // ── loginUser ──────────────────────────────────────────────
      // NOTE: loginUser does NOT touch `loading` — the ProtectedRoute
      // loading flag is only for the initial session check (checkUser).
      // The login form uses its own `isSubmitting` from react-hook-form.
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ── registerUser ───────────────────────────────────────────
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ── logoutUser ─────────────────────────────────────────────
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })

      // ── updateInterests ────────────────────────────────────────
      .addCase(updateInterests.fulfilled, (state, action) => {
        if (action.payload?.user) {
          state.user = action.payload.user;
        }
      })

      // ── updateProfile ──────────────────────────────────────────
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;

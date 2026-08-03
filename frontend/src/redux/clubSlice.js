import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// ── Public thunks ──────────────────────────────────────────────────────────────
export const fetchAllClubs = createAsyncThunk(
  "clubs/fetchAllClubs",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/clubs/all");
      return res.data.clubs;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch clubs"
      );
    }
  }
);

export const fetchClubById = createAsyncThunk(
  "clubs/fetchClubById",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/clubs/${id}`);
      return res.data.club;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch club"
      );
    }
  }
);

// ── Authenticated club thunks ──────────────────────────────────────────────────
export const fetchClubProfile = createAsyncThunk(
  "clubs/fetchClubProfile",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/clubs/profile");
      return res.data.club;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch club profile"
      );
    }
  }
);

export const updateClubProfile = createAsyncThunk(
  "clubs/updateClubProfile",
  async (data, thunkAPI) => {
    try {
      const res = await API.put("/clubs/profile", data);
      return res.data.club;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update club profile"
      );
    }
  }
);

// ── Slice ──────────────────────────────────────────────────────────────────────
const clubSlice = createSlice({
  name: "clubs",
  initialState: {
    clubs: [],
    singleClub: null,
    clubProfile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAllClubs
      .addCase(fetchAllClubs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllClubs.fulfilled, (state, action) => {
        state.loading = false;
        state.clubs = action.payload;
      })
      .addCase(fetchAllClubs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchClubById
      .addCase(fetchClubById.pending, (state) => {
        state.loading = true;
        state.singleClub = null;
        state.error = null;
      })
      .addCase(fetchClubById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleClub = action.payload;
      })
      .addCase(fetchClubById.rejected, (state, action) => {
        state.loading = false;
        state.singleClub = null;
        state.error = action.payload;
      })

      // fetchClubProfile
      .addCase(fetchClubProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClubProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.clubProfile = action.payload;
      })
      .addCase(fetchClubProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateClubProfile
      .addCase(updateClubProfile.fulfilled, (state, action) => {
        state.clubProfile = action.payload;
      });
  },
});

export default clubSlice.reducer;

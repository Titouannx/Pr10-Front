import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password, rememberMe }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password, rememberMe);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const userData = await AuthService.getUserProfile();
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ firstName, lastName }, { rejectWithValue }) => {
    try {
      const updatedUser = await AuthService.updateUserProfile({ firstName, lastName });
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(fetchUserProfile.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
              state.loading = false;
              state.isLoggedIn = true;
              state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            });
    },
});

const { reducer } = authSlice;
export default reducer;
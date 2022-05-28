import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as userApi from 'lib/apis/user';
import { fulfilled, initial, pending, rejected } from 'lib/helpers/store';
import { User } from 'types/models/User';
import { AsyncState } from 'types/store/AsyncState';

export type UserState = AsyncState<User | null>;

const initialState: UserState = initial();

export const fetchUser = createAsyncThunk('user', userApi.getCurrentUser);

export const logout = createAsyncThunk('user/logout', userApi.logout);

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserState,
  reducers: {
    setUser(_state, action: PayloadAction<User | null>) {
      return fulfilled(action.payload);
    },
    setUserAttribute(state, action: PayloadAction<Partial<User>>) {
      if (state.value) {
        state.value = { ...state.value, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, () => pending());
    builder.addCase(fetchUser.fulfilled, (_state, { payload }) =>
      fulfilled(payload),
    );
    builder.addCase(fetchUser.rejected, (_state, action) =>
      rejected(action.error),
    );
    builder.addCase(logout.fulfilled, () => fulfilled(null));
  },
});

export default userSlice.reducer;
export const { setUser, setUserAttribute } = userSlice.actions;

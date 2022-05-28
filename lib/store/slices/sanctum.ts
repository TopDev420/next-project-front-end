import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { csrfCookie } from 'lib/apis/sanctum';
import { fulfilled, initial, pending, rejected } from 'lib/helpers/store';
import { AsyncState } from 'types/store/AsyncState';

export type SanctumState = AsyncState<boolean>;

const initialState: SanctumState = initial();

export const sanctum = createAsyncThunk('sanctum', csrfCookie);

export const sanctumSlice = createSlice({
  name: 'sanctum',
  initialState: initialState as SanctumState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sanctum.pending, () => pending());
    builder.addCase(sanctum.fulfilled, () => fulfilled(true));
    builder.addCase(sanctum.rejected, (_state, action) =>
      rejected(action.error),
    );
  },
});

export default sanctumSlice.reducer;

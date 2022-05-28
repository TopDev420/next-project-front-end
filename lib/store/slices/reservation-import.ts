import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { reservationKeyApi } from 'lib/apis/reservation-key';
import { fulfilled, initial, pending, rejected } from 'lib/helpers/store';
import { AsyncState } from 'types/store/AsyncState';

export type ReservationImportState = AsyncState<{}>;

const initialState: ReservationImportState = initial();

export const syncReservation = createAsyncThunk('user', reservationKeyApi.sync);

export const reservationImportSlice = createSlice({
  name: 'reservationImport',
  initialState: initialState as ReservationImportState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(syncReservation.pending, () => pending());
    builder.addCase(syncReservation.fulfilled, (_state, { payload }) =>
      fulfilled(payload),
    );
    builder.addCase(syncReservation.rejected, (_state, action) =>
      rejected(action.error),
    );
  },
});
const reservationImportReducer = reservationImportSlice.reducer;
export default reservationImportReducer;

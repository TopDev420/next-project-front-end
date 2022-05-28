import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from 'types/models/Room';

export type RoomState = {
  value: Room | null;
};

const initialState: RoomState = {
  value: null,
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    updateRoom(state, action: PayloadAction<Room | null>) {
      state.value = action.payload;
    },
  },
});

export default roomSlice.reducer;
export const { updateRoom } = roomSlice.actions;

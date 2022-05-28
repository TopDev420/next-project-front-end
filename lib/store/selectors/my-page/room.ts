import { RootState } from 'types/store';

export const myPagePropertyRoomSelector = (state: RootState) =>
  state.myPage.room.value;

export const myPagePropertyRoomIdSelector = (state: RootState) =>
  state.myPage.room.value?.id;

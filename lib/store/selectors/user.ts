import { RootState } from 'types/store';

export const userSelector = (state: RootState) => state.user;
export const currentUserSelector = (state: RootState) => state.user.value;

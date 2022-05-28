import { RootState } from 'types/store';

export const uiSelector = (state: RootState) => state.ui;

export const modalsSelector = (state: RootState) => state.ui.modals;

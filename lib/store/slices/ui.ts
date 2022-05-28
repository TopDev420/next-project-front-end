/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalType } from 'types/Modal';

export type UIState = {
  modals: Partial<Record<ModalType, any>>;
};

const initialState: UIState = { modals: {} };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    presentModal(
      state,
      action: PayloadAction<{
        type: ModalType;
        props?: Record<string, any>;
        exclusive?: boolean;
      }>,
    ) {
      if (action.payload.exclusive) {
        state.modals = {
          [action.payload.type]: action.payload.props || {},
        };
      } else {
        state.modals[action.payload.type] = action.payload.props || {};
      }
    },
    dismissModal(
      state,
      action: PayloadAction<{ type?: ModalType } | undefined>,
    ) {
      if (!action?.payload?.type) {
        state.modals = {};
      } else {
        delete state.modals[action.payload.type];
      }
    },
  },
});

export default uiSlice.reducer;
export const { presentModal, dismissModal } = uiSlice.actions;

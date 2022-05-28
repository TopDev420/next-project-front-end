import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SocialUser } from 'types/models/User';

export type SocialAuthState = {
  provider: 'facebook' | null;
  socialUser: SocialUser | null;
};

const initialState: SocialAuthState = {
  provider: null,
  socialUser: null,
};

const socialAuthSlice = createSlice({
  name: 'socialAuth',
  initialState,
  reducers: {
    setState(_state, action: PayloadAction<SocialAuthState>) {
      return action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export default socialAuthSlice.reducer;
export const { setState: setSocialAuth, reset: resetSocialAuth } =
  socialAuthSlice.actions;
